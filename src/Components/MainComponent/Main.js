import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { NavLink, useLocation, useParams } from "react-router-dom";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import {
  getUiInfoStorage,
  localServiceActions,
} from "../../Services/LocalService/localService";
import toast, { Toaster } from "react-hot-toast";
import {
  useDispatchUiState,
  useUiState,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

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
import { css } from "styled-components";
import { insertTodo } from "../../Services/RemoteService/Actions/insertTodo";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { toTitleCase } from "../../Utilities/toTitleCase";
import { updateTodoServer } from "../../Services/RemoteService/Actions/updateTodoServer";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";
import { useQuery } from "react-query";

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
  const newList = [];
  const [allData, setAllData] = useState({
    personal: { all: null, completed: null },
    school: { all: null, completed: null },
    work: { all: null, completed: null },
    groceries: { all: null, completed: null },
  });
  const [userData, setUserData] = useState();
  const [summaryLoading, setSummeryLoading] = useState();
  const dispatchUiState = useDispatchUiState();
  const isMounted = useRef(true);
  const { processModal } = useOpenAndCloseModal();
  const userAccessType = localServiceActions.getItem("userAccessType");
  const ac = new AbortController();

  const uiState = useUiState();

  useEffect(() => {
    if (uiState.shouldReRender) {
      handle();
      dispatchUiState({ type: "error", payload: false });
    }
  }, [uiState.shouldReRender]);

  const handle = useCallback(async () => {
    if (!isMounted.current) return null;
    try {
      if (currentLocation === "/main") {
        dispatchUiState({ type: "loading", payload: false });

        setSummeryLoading(true);
        const { data } = await supabase
          .from("TodoList")
          .select("personal, school, work, groceries, userEmail")
          .match({ userEmail: getUiInfoStorage().email })
          .abortSignal(ac.signal);
        const allTodos = data[0];
        const realData = Object.values(allTodos);

        for (let index = 0; index < 4; index++) {
          if (realData[index] !== null && realData[index] !== undefined) {
            const currentData = realData[index].map((item) => item);
            const completedTodos = currentData.filter((element) => {
              return element.isComplete;
            });
            if (isMounted.current) {
              setAllData((prevState) => ({
                ...prevState,
                [currentData[0]?._taskCategory]: {
                  all: Object.keys(currentData).length,
                  completed: completedTodos.length,
                },
              }));
            } else return null;
          }
        }
      } else {
        dispatchUiState({ type: "loading", payload: true });

        const { data, error } = await supabase
          .from("TodoList")
          .select(`${searchName}, userEmail`)
          .match({ userEmail: getUiInfoStorage().email })
          .abortSignal(ac.signal);

        if (error?.message.includes("aborted")) throw new Error("aborted");

        const targetTodos = data[0][searchName];
        if (targetTodos.length === 0)
          notify().error(
            `${toTitleCase(searchName)} Is Empty ! Try Adding Task !`
          );
        setUserData(targetTodos);

        targetTodos.forEach((item) => newList.push(item));
        setTodos(newList);
      }
    } catch (error) {
      const changeRegEx = /aborted/;
      if (!changeRegEx.test(error)) {
        setSummeryLoading(false);
        dispatchUiState({ type: "loading", payload: false });
        const errorRegEx = /0/;
        const errorRegEx2 = /object/;
        if (errorRegEx2.test(error)) {
          setAllData({
            personal: { all: null, completed: null },
            school: { all: null, completed: null },
            work: { all: null, completed: null },
            groceries: { all: null, completed: null },
          });
        }

        if (!errorRegEx.test(error)) {
          notify().error(
            `${toTitleCase(searchName)} Is Empty ! Try Adding Task !`
          );
        } else {
          notify().error(
            "An Unknown Error Occurred ! Check Your Internet Connection !"
          );
          dispatchUiState({ type: "error", payload: true });
        }
      } else return;
    }
    dispatchUiState({ type: "loading", payload: false });
    setSummeryLoading(false);
    dispatchUiState({ type: "shouldReRender", payload: false });
  }, [currentLocation]);

  useEffect(() => {
    processModal(null);
    if (userAccessType !== "LoggedIn") localServiceActions.removeItem("uiInfo");

    return () => {
      dispatchUiState({ type: "loading", payload: false });
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ac.abort();
    }, 10000);
    dispatchUiState({ type: "error", payload: false });
    if (currentLocation === "/main") {
      setAllData({
        personal: { all: null, completed: null },
        school: { all: null, completed: null },
        work: { all: null, completed: null },
        groceries: { all: null, completed: null },
      });
    } else setTodos([]);
    handle();
    return () => {
      if (
        searchName !== todos[0]?._taskCategory &&
        currentLocation !== "/main"
      ) {
        ac.abort();
      }
    };
  }, [currentLocation]);

  const notify = () => toast;

  const addTodo = async (todo) => {
    if (!todo._title || !todo._desc || /^\s*$/.test(todo._title, todo._desc)) {
      notify().error("Please enter all fields");
      return;
    }
    dispatchUiState({ type: "loading", payload: true });
    try {
      const newTodo = [todo, ...todos];
      if (userData === undefined) {
        console.log("undefined");
        await insertTodo([
          { [searchName]: newTodo, userEmail: getUiInfoStorage().email },
        ]);
      } else {
        await updateTodoServer(
          { [searchName]: newTodo },
          getUiInfoStorage().email
        );
      }
      if (isMounted.current) setTodos(newTodo);
      else return null;
      notify().success("Task added 🥳");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    dispatchUiState({ type: "loading", payload: false });
  };

  const updateTodo = async (todoId, newValue) => {
    if (
      !newValue._title ||
      !newValue._desc ||
      /^\s*$/.test(newValue._title, newValue._desc)
    ) {
      return;
    }

    const items = todos.map((item) => (item.id === todoId ? newValue : item));

    if (isMounted.current) setTodos(items);
    else return null;
    dispatchUiState({ type: "loading", payload: true });

    try {
      await updateTodoServer({ [searchName]: items }, getUiInfoStorage().email);
      notify().success("Updated 💥");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    dispatchUiState({ type: "loading", payload: false });
  };

  const isComplete = async (id) => {
    let completedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    if (isMounted.current) setTodos(completedTodo);
    else return null;
    dispatchUiState({ type: "loading", payload: true });

    try {
      await updateTodoServer(
        { [searchName]: completedTodo },
        getUiInfoStorage().email
      );
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    dispatchUiState({ type: "loading", payload: false });
  };

  const delteTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    dispatchUiState({ type: "loading", payload: true });

    try {
      await updateTodoServer(
        { [searchName]: updatedTodos },
        getUiInfoStorage().email
      );
      if (isMounted.current) setTodos(updatedTodos);
      else return null;
      notify().success("Deleted !");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    dispatchUiState({ type: "loading", payload: false });
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
                p="8px"
                borderRadius="10px"
                cursor="pointer"
              >
                <BsThreeDots color={headerIconColor} />
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
              todos={todos}
              isComplete={isComplete}
              removeTodo={delteTodo}
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
