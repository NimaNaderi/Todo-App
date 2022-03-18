import { BiEdit, BiTrash } from "react-icons/bi";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useLocation, useParams } from "react-router-dom";
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
import { IoBook } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { UI_STATE_TYPES } from "../../Context/uiStateReducer";
import { css } from "styled-components";
import queryKeys from "../../Utilities/queryKeys";
import { setAll } from "../../Function/setAll";
import { setTodoList } from "../../Function/setTodoList";
import { toTitleCase } from "../../Utilities/toTitleCase";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useGetAllData } from "../../Hooks/Server/useGetAllData";
import { useGetOneData } from "../../Hooks/Server/useGetOneData";
import { useIsUserSignedUp } from "../../Hooks/Server/useIsUserSignedUp";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

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

  const userEmailExisted = useRef(false);
  const queryClient = useQueryClient();

  const updateMutation = useUpdateTodo(searchName);
  const insertMutation = useInsertTodo(searchName);

  useEffect(() => {
    if (dataOne === undefined) return null;

    const originalData = dataOne.data[0][searchName];

    const searchedItems = originalData.filter((todo) =>
      todo._title
        .toLowerCase()
        .includes(uiState.searchedText.trim().toLowerCase())
    );
    if (searchedItems) {
      if (uiState.searchedText.length > 0) setTodos(searchedItems);
      else setTodos(originalData);
    }
    searchedItems.length === 0 &&
      notify().error("Couldn't Find Any Todo !", {
        id: "NoData",
        duration: 2000,
      });
  }, [uiState.searchedText]);

  useEffect(() => {
    if (isEmailSuccess) {
      userEmailExisted.current = emailData.data.length !== 0 ? true : false;
      console.log(userEmailExisted.current);
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
      dispatchUiState({ type: "loading", payload: false });
      if (dataOne.data.length > 0) {
        setTodos(setTodoList(searchName, dataOne.data, isFetchedAfterMount));
      }
    }
    if (isOneLoading)
      if (!uiState.loading) dispatchUiState({ type: "loading", payload: true });
  }, [isOneFetching, isOneRefetching, isOneLoading]);

  useEffect(() => {
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
      refetchOne();
      setTodos([]);
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
    const newTodo = [todo, ...todos];

    if (isEmailSuccess && !userEmailExisted.current) {
      insertMutation.mutate(newTodo);
    } else if (isEmailSuccess && userEmailExisted.current) {
      updateMutation.mutate(newTodo);
    }
  };

  useEffect(() => {
    if (insertMutation.isSuccess) {
      refetchEmail();
      const updatedData = {
        ...dataOne,
        data: [
          {
            [searchName]: insertMutation.variables,
            userEmail: getUiInfoStorage().email,
          },
        ],
      };

      queryClient.setQueryData(
        [queryKeys.GET_ONE_DATA_KEY, searchName],
        updatedData
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
      const updatedData = {
        ...dataOne,
        data: [
          {
            [searchName]: updateMutation.variables,
            userEmail: getUiInfoStorage().email,
          },
        ],
      };

      queryClient.setQueryData(
        [queryKeys.GET_ONE_DATA_KEY, searchName],
        updatedData
      );

      setTodos(updateMutation.variables);

      dispatchUiState({ type: "loading", payload: false });
      if (notifyType.current === "update") notify().success("Updated 💥");
      else if (notifyType.current === "delete") notify().success("Deleted !");
      else if (notifyType.current === "removeAll")
        notify().success("Your List Cleared !");

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

    const items = todos.map((item) => (item.id === todoId ? newValue : item));
    updateMutation.mutate(items);
  };

  const isComplete = (id) => {
    let completedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    updateMutation.mutate(completedTodo);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    notifyType.current = "delete";

    updateMutation.mutate(updatedTodos);
  };

  const deleteAll = () => {
    if (dataOne.data[0][searchName].length === 0) {
      notify().error("Your List Is Empty !", {
        id: "ClearAllFailed",
        duration: 3000,
      });
      return;
    }
    notifyType.current = "removeAll";
    updateMutation.mutate([]);
  };

  return (
    <Box h="full" bg={MainBg} height="fit-content" minH="full">
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
          <div className="flex content-start w-full flex-col h-screen pb-24 ">
            <section className=" h-1/2 flex justify-center items-end mb-4">
              <NavLink to={"/main?type=personal"}>
                <div
                  className="mr-20 w-96 h-44 rounded-xl flex items-center "
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
                  className="w-96 h-44 rounded-xl flex items-center"
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
            <section className="h-1/2 flex justify-center mt-4">
              <NavLink to="/main?type=work">
                <div
                  className="mr-20 w-96 h-44  rounded-xl flex items-center"
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
                  className="w-96 h-44 rounded-xl flex items-center"
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
