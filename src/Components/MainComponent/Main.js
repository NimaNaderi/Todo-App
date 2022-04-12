import { BiEdit, BiTrash } from "react-icons/bi";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  getUiInfoStorage,
  localServiceActions,
} from "../../Services/LocalService/localService";
import toast, { Toaster } from "react-hot-toast";
import {
  useDispatchUiState,
  useUiState,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";
import { useInsertTodo, useUpdateTodo } from "../../Hooks/Server/useSendTodo";
import { useIsFetching, useQueryClient } from "react-query";

import { BsThreeDots } from "react-icons/bs";
import CardItem from "../Card/CardItem";
import { ClipLoader } from "react-spinners";
import { Divider } from "@chakra-ui/react";
import { IoBook } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RiComputerFill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { UI_STATE_TYPES } from "../../Context/uiStateReducer";
import { css } from "styled-components";
import { data } from "autoprefixer";
import queryKeys from "../../Utilities/queryKeys";
import { setAll } from "../../Function/setAll";
import { setTodoList } from "../../Function/setTodoList";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import updateQueryData from "../../Utilities/updateQueryData";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useGetAllData } from "../../Hooks/Server/useGetAllData";
import { useGetOneData } from "../../Hooks/Server/useGetOneData";
import { useIsUserSignedUp } from "../../Hooks/Server/useIsUserSignedUp";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";
import { useTranslation } from "react-i18next";

const override = css`
  margin-bottom: 5px;
`;

const Main = ({
  MainBg,
  headerSidBarBg,
  color,
  BorderColorHeader,
  headerIconColor,
}) => {
  const [currentLocation, pathName, search] = useCurrentLocation();
  const searchName = search.split("=")[1];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todos, setTodos] = useState([]);
  const notifyType = useRef(null);
  const allDataInitialValue = {
    personal: { all: null, completed: null },
    school: { all: null, completed: null },
    work: { all: null, completed: null },
    groceries: { all: null, completed: null },
  };
  const [allData, setAllData] = useState(allDataInitialValue);
  const isNetworkAvailable = useRef();
  const [summaryLoading, setSummeryLoading] = useState(false);
  const dispatchUiState = useDispatchUiState();
  const isMounted = useRef(true);
  const { processModal } = useOpenAndCloseModal();
  const userAccessType = localServiceActions.getItem("userAccessType");
  const uiState = useUiState();
  const sortedType = useRef(null);

  const {
    data: dataAll,
    isSuccess: isAllSuccess,
    isFetching: isAllFetching,
    refetch: refetchAll,
    isLoading: isAllLoading,
    isRefetching: isAllReFetching,
    remove: removeAll,
  } = useGetAllData();

  const {
    data: dataOne,
    isSuccess: isOneSuccess,
    isFetching: isOneFetching,
    refetch: refetchOne,
    isRefetching: isOneRefetching,
    isFetchedAfterMount,
    isLoading: isOneLoading,
  } = useGetOneData(searchName);

  const {
    data: emailData,
    isSuccess: isEmailSuccess,
    isRefetching: isEmailRefetching,
    isFetching: isEmailFetching,
    refetch: refetchEmail,
  } = useIsUserSignedUp();

  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const userEmailExisted = useRef(false);

  const updateMutation = useUpdateTodo(searchName);
  const insertMutation = useInsertTodo(searchName);

  const currentLocationCache = useRef();

  useEffect(() => {
    searchHandler();
  }, [uiState.searchedText]);

  useEffect(() => {
    if (isEmailSuccess) {
      userEmailExisted.current = emailData?.data.length !== 0 ? true : false;
    }
  }, [isEmailFetching, isEmailRefetching]);

  useEffect(() => {
    if (!window.navigator.onLine) {
      isNetworkAvailable.current = false;
      notify().error("No Network !, Reconnect For Auto Retry !", {
        id: "NoNetwork",
        duration: 5000,
      });
    } else {
      if (isNetworkAvailable.current === false)
        isNetworkAvailable.current = true;
    }
    if (isAllSuccess) {
      setSummeryLoading(false);
      setAll(dataAll.data, setAllData);
    }
    if (isAllFetching || isAllReFetching || isAllLoading) {
      if (isNetworkAvailable.current) {
        setSummeryLoading(true);
        isNetworkAvailable.current = null;
      }
      dispatchUiState({ type: "loading", payload: false });
      setAllData((prev) => prev);
      if (updateMutation?.variables && !isOneFetching) {
        setSummeryLoading(true);
        updateMutation.reset();
      }
    }

    isAllLoading && setSummeryLoading(true);
  }, [
    isAllFetching,
    isAllReFetching,
    isAllLoading,
    isOneFetching,
    isAllLoading,
  ]);

  useEffect(() => {
    if (isOneSuccess) {
      if (!dataOne) return false;
      dispatchUiState({ type: "loading", payload: false });

      if (
        queryClient
          .getQueryCache()
          .find([queryKeys.GET_ONE_DATA_KEY, searchName]).state.data.data[0] !==
        undefined
      )
        currentLocationCache.current = queryClient
          .getQueryCache()
          .find([queryKeys.GET_ONE_DATA_KEY, searchName]).state.data.data[0][
          searchName
        ];

      if (!uiState.searchedText)
        setTodos(setTodoList(searchName, dataOne.data, isFetchedAfterMount));
      else return;
    }
    if (isOneLoading)
      if (!uiState.loading) dispatchUiState({ type: "loading", payload: true });
  }, [isOneFetching, isOneRefetching, isOneLoading]);

  useEffect(() => {
    localServiceActions.setItem("Language", "en");
    i18n.changeLanguage("en");
    processModal(null);
    if (userAccessType !== "LoggedIn") localServiceActions.removeItem("uiInfo");

    return () => {
      dispatchUiState({ type: "loading", payload: false });
      isMounted.current = false;
      removeAll();
    };
  }, []);

  useEffect(() => {
    dispatchUiState({ type: "error", payload: false });
    dispatchUiState({ type: UI_STATE_TYPES.searchedText, payload: "" });

    if (currentLocation === "/main") {
      refetchAll();
      setAllData(allDataInitialValue);
    } else {
      currentLocationCache.current =
        queryClient
          .getQueryCache()
          .find([queryKeys.GET_ONE_DATA_KEY, searchName]).state?.data
          ?.data[0] !== undefined
          ? queryClient
              .getQueryCache()
              .find([queryKeys.GET_ONE_DATA_KEY, searchName]).state?.data
              ?.data[0][searchName]
          : [];

      setTodos(currentLocationCache.current);
      if (!currentLocationCache.current || !currentLocationCache.current.length)
        refetchOne();
    }
    // return () => {
    //   if (
    //     searchName !== todos[0]?._taskCategory &&
    //     currentLocation !== "/main"
    //   ) {
    //     notify().error("Operation Canceled Due To Exiting The Page !", {
    //       id: "Canceled",
    //     });
    //   }
    // };
  }, [currentLocation]);

  const notify = () => toast;

  const addTodo = (todo) => {
    if (!todo._title || !todo._desc || /^\s*$/.test(todo._title, todo._desc)) {
      notify().error("Please enter all fields");
      return;
    }
    const newTodo = [todo, ...currentLocationCache.current];

    if (isEmailSuccess && !userEmailExisted.current) {
      insertMutation.mutate(newTodo);
    } else if (isEmailSuccess && userEmailExisted.current) {
      updateMutation.mutate(newTodo);
    }
  };

  useEffect(() => {
    if (insertMutation.isSuccess) {
      refetchEmail();

      updateQueryData(
        { ...dataOne },
        { newData: insertMutation.variables, queryClient, searchName }
      );

      dispatchUiState({ type: "loading", payload: false });
      queryClient.invalidateQueries(queryKeys.GET_ALL_DATA_KEY);
      setTodos(insertMutation.variables);
    }
    insertMutation.isLoading &&
      dispatchUiState({ type: "loading", payload: true });
  }, [insertMutation.isLoading]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      updateQueryData(
        { ...dataOne },
        {
          newData: updateMutation.variables,
          searchName,
          queryClient,
        }
      );

      refetchOne();
      if (uiState.searchedText) {
        searchHandler();
      } else setTodos(updateMutation.variables);

      dispatchUiState({ type: "loading", payload: false });
      if (notifyType.current === "update") notify().success("Updated 💥");
      else if (notifyType.current === "delete") notify().success("Deleted !");
      else if (notifyType.current === "removeAll") {
        notify().success("Your List Cleared !");
      }

      notifyType.current = null;

      queryClient.invalidateQueries(queryKeys.GET_ALL_DATA_KEY);
    }
    updateMutation.isLoading &&
      dispatchUiState({ type: "loading", payload: true });
  }, [updateMutation.isLoading]);

  const updateTodo = (todoId, newValue) => {
    if (
      !newValue._title ||
      !newValue._desc ||
      /^\s*$/.test(newValue._title, newValue._desc)
    ) {
      return;
    }
    notifyType.current = "update";

    const items = currentLocationCache.current.map((item) =>
      item.id === todoId ? newValue : item
    );
    updateMutation.mutate(items);
  };

  const isComplete = (id) => {
    let completedTodo = currentLocationCache.current.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    updateMutation.mutate(completedTodo);
  };

  const deleteTodo = (id) => {
    const updatedTodos = currentLocationCache.current.filter(
      (todo) => todo.id !== id
    );
    notifyType.current = "delete";

    updateMutation.mutate(updatedTodos);
  };

  const deleteAll = () => {
    if (todos.length === 0) {
      notify().error("Your List Is Empty !", {
        id: "ClearAllFailed",
        duration: 3000,
      });
      return;
    }
    notifyType.current = "removeAll";
    updateMutation.mutate([]);
  };

  const searchHandler = () => {
    if (dataOne === undefined || !todos) return;

    const originalData = [...currentLocationCache.current];

    const searchedItems = originalData.filter((todo) =>
      todo._title
        .toLowerCase()
        .includes(uiState.searchedText.trim().toLowerCase())
    );

    if (uiState.searchedText.length > 0) setTodos(searchedItems);
    else
      setTodos(
        queryClient.getQueryData([queryKeys.GET_ONE_DATA_KEY, searchName])
          .data[0][searchName]
      );

    if (!searchedItems.length) {
      notify().error("Couldn't Find Any Todo !", {
        id: "NoData",
        duration: 2000,
      });
      return;
    }
  };

  const sortHandler = (sortType) => {
    validateSort();
    sortedType.current = sortType;

    const { originalSortedTodos, searchedSortedTodos } = sortTodos(sortType);

    updateQueryData(
      { ...dataOne },
      {
        newData: originalSortedTodos,
        searchName,
        queryClient,
        sortedType: sortType,
      }
    );

    !uiState.searchedText.length
      ? setTodos(originalSortedTodos)
      : setTodos(searchedSortedTodos);
  };

  const sortTodos = (sortType) => {
    const searchedTodos = [...todos];
    const originalTodos = [...currentLocationCache.current];

    return {
      searchedSortedTodos: searchedTodos.sort(function (a, b) {
        let nameA = a._title.toLowerCase(),
          nameB = b._title.toLowerCase();
        if (sortType === "Asc" ? nameA < nameB : nameA > nameB)
          //sort string ascending
          return -1;
        if (sortType === "Des" ? nameA < nameB : nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      }),
      originalSortedTodos: originalTodos.sort(function (a, b) {
        let nameA = a._title.toLowerCase(),
          nameB = b._title.toLowerCase();
        if (sortType === "Asc" ? nameA < nameB : nameA > nameB)
          //sort string ascending
          return -1;
        if (sortType === "Des" ? nameA < nameB : nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      }),
    };
  };

  const validateSort = () => {
    if (todos.length === 0) {
      notify().error("Your List Is Empty !", {
        id: "SortFailed",
        duration: 3000,
      });
      throw new Error("Your List Is Empty !");
    } else if (todos.length === 1) {
      notify().error("Can't Sort One Item !", {
        id: "SortFailed",
        duration: 3000,
      });
      throw new Error("Can't Sort One Item !");
    }
  };

  const renderSortIcon = () => {
    if (
      todos === undefined ||
      !todos.length ||
      !sortedType ||
      !queryClient.getQueryData([queryKeys.GET_ONE_DATA_KEY, searchName])
    )
      return null;

    const currentPageSortedType =
      queryClient.getQueryData([queryKeys.GET_ONE_DATA_KEY, searchName])
        .data[0] !== undefined
        ? queryClient.getQueryData([queryKeys.GET_ONE_DATA_KEY, searchName])
            .data[0].sortedType
        : null;

    switch (currentPageSortedType) {
      case "Asc":
        return (
          <svg
            className="w-4 h-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M239.6 373.1c11.94-13.05 11.06-33.31-1.969-45.27c-13.55-12.42-33.76-10.52-45.22 1.973L160 366.1V64.03c0-17.7-14.33-32.03-32-32.03S96 46.33 96 64.03v302l-32.4-35.39C51.64 317.7 31.39 316.7 18.38 328.7c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0L239.6 373.1zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88S460.9 288 447.1 288H319.1C302.3 288 288 302.3 288 320s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1C465.7 480 480 465.7 480 448S465.7 416 448 416zM492.6 209.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zM367.8 167.4L384 134.7l16.22 32.63H367.8z" />
          </svg>
        );

      case "Des":
        return (
          <svg
            className="w-4 h-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M151.6 41.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.473 151.1 5.348 171.4 18.38 183.3c13.02 11.95 33.27 11.04 45.22-1.973L96 145.9v302C96 465.7 110.3 480 128 480S160 465.7 160 447.1V145.9L192.4 181.3c11.46 12.49 31.67 14.39 45.22 1.973c13.03-11.95 13.9-32.22 1.969-45.27L151.6 41.95zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88s-16.63-19.86-29.56-19.86H319.1C302.3 287.9 288 302.3 288 320s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1C465.7 480 480 465.7 480 448S465.7 416 448 416zM492.6 209.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zM367.8 167.4L384 134.7l16.22 32.63H367.8z" />
          </svg>
        );

      default:
        break;
    }
  };

  return (
    <Box h="full" bg={MainBg} height="fit-content">
      <Toaster notify={notify} />
      <Container
        maxW="container.lg"
        border="1px solid"
        borderColor="transparent"
        height="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="53px"
        pr={{ base: "3", md: "3", lg: "3", xl: "0" }}
      >
        {currentLocation === "/main" ? (
          <div className="flex content-start w-full flex-col lg:pb-24">
            <section className="h-1/2 block lg:flex justify-center items-end mb-4">
              <NavLink to={"/main?type=personal"}>
                <div
                  className="md:w-96 w-72 h-44 rounded-xl flex items-center "
                  style={{ backgroundColor: "#78DEC7" }}
                >
                  <span className="w-2/3 flex items-center ">
                    <TiUser color="white" fontSize="144px" className="inline" />
                    <span className="text-4xl">Personal</span>
                  </span>
                  <span className="w-1/3 mt-1 flex flex-col items-center">
                    <ClipLoader
                      size={25}
                      css={override}
                      loading={summaryLoading}
                    />
                    {!summaryLoading && (
                      <p className=" text-2xl">
                        {allData.personal.all > 0
                          ? `${allData.personal.completed} / ${allData.personal.all}`
                          : "Empty"}
                      </p>
                    )}
                    {allData.personal.all > 0 && (
                      <div className="text-lg">Completed</div>
                    )}
                  </span>
                </div>
              </NavLink>
              <NavLink to="/main?type=school">
                <div
                  className="md:w-96 w-72 h-56 md:h-44 rounded-xl flex items-center"
                  style={{ backgroundColor: "#FF95C5" }}
                >
                  <span className="w-2/3 flex items-center pl-8 ">
                    <IoBook
                      color="white"
                      fontSize="104px"
                      className="inline pr-2"
                    />
                    <span className="text-4xl ml-6">School</span>
                  </span>
                  <span className="w-1/3 mt-1 flex flex-col items-center">
                    <ClipLoader
                      size={25}
                      css={override}
                      loading={summaryLoading}
                    />
                    {!summaryLoading && (
                      <p className=" text-2xl">
                        {allData.school.all > 0
                          ? `${allData.school.completed} / ${allData.school.all}`
                          : "Empty"}
                      </p>
                    )}
                    {allData.school.all > 0 && (
                      <div className="text-lg">Completed</div>
                    )}
                  </span>
                </div>
              </NavLink>
            </section>
            <section className="h-1/2 block lg:flex justify-center items-end mb-4 mt-4">
              <NavLink to="/main?type=work">
                <div
                  className="md:w-96 w-72 h-44 rounded-xl flex items-center"
                  style={{ backgroundColor: "#B983FF" }}
                >
                  <span className="w-2/3 flex items-center pl-8 ">
                    <RiComputerFill
                      color="white"
                      fontSize="104px"
                      className="inline pr-2"
                    />
                    <span className="text-4xl ml-6">Work</span>
                  </span>
                  <span className="w-1/3 mt-1 flex flex-col items-center">
                    <ClipLoader
                      size={25}
                      css={override}
                      loading={summaryLoading}
                    />
                    {!summaryLoading && (
                      <p className=" text-2xl">
                        {allData.work.all > 0
                          ? `${allData.work.completed} / ${allData.work.all}`
                          : "Empty"}
                      </p>
                    )}
                    {allData.work.all > 0 && (
                      <div className="text-lg">Completed</div>
                    )}
                  </span>
                </div>
              </NavLink>
              <NavLink to="/main?type=groceries">
                <div
                  className="md:w-96 w-72 h-44 rounded-xl flex items-center"
                  style={{ backgroundColor: "#FFD523" }}
                >
                  <span className="w-2/3 flex items-center ml-7 ">
                    <MdShoppingCart
                      color="white"
                      fontSize="144px"
                      className="inline"
                    />
                    <span className="text-3xl mr-7">Groceries</span>
                  </span>
                  <span className="w-1/3 mt-1 flex flex-col items-center mr-7">
                    <ClipLoader
                      size={25}
                      css={override}
                      loading={summaryLoading}
                    />
                    {!summaryLoading && (
                      <p className=" text-2xl">
                        {allData.groceries.all > 0
                          ? `${allData.groceries.completed} / ${allData.groceries.all}`
                          : "Empty"}
                      </p>
                    )}
                    {allData.groceries.all > 0 && (
                      <div className="text-lg">Completed</div>
                    )}
                  </span>
                </div>
              </NavLink>
            </section>
          </div>
        ) : (
          <>
            <Flex
              mt="12"
              w="full"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <NavLink to="/main">
                  <Box
                    mr="3"
                    w="33px"
                    h="33px"
                    cursor="pointer"
                    borderRadius="10px"
                    background="gray.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.700"
                    transition=".1s"
                    bg={BorderColorHeader}
                  >
                    <IoChevronBackOutline color={headerIconColor} />
                  </Box>
                </NavLink>
                <Heading color={color} size="lg">
                  {search.split("=")[1].toUpperCase()}
                </Heading>
              </Flex>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="10px"
                cursor="pointer"
              >
                <section className="mr-2">{renderSortIcon()}</section>
                <Menu>
                  <MenuButton
                    pl="0"
                    pr="3"
                    bg="transparent"
                    _focus={{ outline: "none" }}
                    _hover={{}}
                    _active={{}}
                    as={Button}
                    rightIcon={<BsThreeDots color={headerIconColor} />}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<BiTrash fontSize="17px" />}
                      color="red.400"
                      onClick={deleteAll}
                    >
                      Remove All
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => sortHandler("Asc")}
                      icon={
                        <svg
                          className="w-4 h-5 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M239.6 373.1c11.94-13.05 11.06-33.31-1.969-45.27c-13.55-12.42-33.76-10.52-45.22 1.973L160 366.1V64.03c0-17.7-14.33-32.03-32-32.03S96 46.33 96 64.03v302l-32.4-35.39C51.64 317.7 31.39 316.7 18.38 328.7c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0L239.6 373.1zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88S460.9 288 447.1 288H319.1C302.3 288 288 302.3 288 320s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1C465.7 480 480 465.7 480 448S465.7 416 448 416zM492.6 209.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zM367.8 167.4L384 134.7l16.22 32.63H367.8z" />
                        </svg>
                      }
                    >
                      Sort Ascending
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => sortHandler("Des")}
                      icon={
                        <svg
                          className="w-4 h-5 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M151.6 41.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.473 151.1 5.348 171.4 18.38 183.3c13.02 11.95 33.27 11.04 45.22-1.973L96 145.9v302C96 465.7 110.3 480 128 480S160 465.7 160 447.1V145.9L192.4 181.3c11.46 12.49 31.67 14.39 45.22 1.973c13.03-11.95 13.9-32.22 1.969-45.27L151.6 41.95zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88s-16.63-19.86-29.56-19.86H319.1C302.3 287.9 288 302.3 288 320s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1C465.7 480 480 465.7 480 448S465.7 416 448 416zM492.6 209.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zM367.8 167.4L384 134.7l16.22 32.63H367.8z" />
                        </svg>
                      }
                    >
                      Sort Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            <CardItem
              onClick={onOpen}
              mt="12"
              display="flex"
              alignItems="center"
              borderRadius="10px"
              borderColor={BorderColorHeader}
              cursor="pointer"
              bg={headerSidBarBg}
            >
              <Box
                mr="3"
                w="25px"
                h="25"
                borderRadius="8px"
                bg="#FF95C5"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <MdAdd fontSize="18px" />
              </Box>
              <Heading color={color} size="sm">
                Add New Task
              </Heading>
            </CardItem>
            <TodoForm
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
              onsubmit={addTodo}
              color={color}
              headerSidBarBg={headerSidBarBg}
            />
            <Todo
              todos={todos ? todos : []}
              isComplete={isComplete}
              removeTodo={deleteTodo}
              updateTodo={updateTodo}
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
              headerSidBarBg={headerSidBarBg}
              color={color}
              BorderColorHeader={BorderColorHeader}
              headerIconColor={headerIconColor}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default Main;
