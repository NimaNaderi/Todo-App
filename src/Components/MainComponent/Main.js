import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { NavLink, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { BsThreeDots } from "react-icons/bs";
import CardItem from "../Card/CardItem";
import { IoBook } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { getUiInfoStorage } from "../../Services/LocalService/localService";
import { insertTodo } from "../../Services/RemoteService/Actions/insertTodo";
import { selectTodoList } from "../../Services/RemoteService/Actions/selectTodoList";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { toTitleCase } from "../../Utilities/toTitleCase";
import { updateTodoServer } from "../../Services/RemoteService/Actions/updateTodoServer";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useDisclosure } from "@chakra-ui/react";
import { useLoadingBarData } from "../../Hooks/UI/useLoadingBarData";

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
  const [userData, setUserData] = useState();
  const { setLoading, loading } = useLoadingBarData();
  let a = 0;
  console.log("reExecute");

  const handle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("TodoList")
        .select(`${searchName}, userEmail`)
        .match({ userEmail: getUiInfoStorage().email });
      a = 1;

      const receivedTodos = data[0][searchName];
      setUserData(receivedTodos);

      receivedTodos.forEach((item) => newList.push(item));
      setTodos(newList);
    } catch (error) {
      console.log(error);
      const errorRegEx = /0/;
      if (!errorRegEx.test(error)) {
        notify().error(
          `${toTitleCase(searchName)} Is Empty ! Try Adding Task !`
        );
      } else
        notify().error(
          "An Unknown Error Occurred ! Check Your Internet Connection !"
        );
    }
    setLoading(false);
  };

  useEffect(() => {
    setTodos([]);
    handle();
  }, [currentLocation]);

  const notify = () => toast;

  const addTodo = async (todo) => {
    console.log(a, "add");
    if (!todo._title || !todo._desc || /^\s*$/.test(todo._title, todo._desc)) {
      notify().error("Please enter all fields");
      return;
    }
    setLoading(true);
    console.log(userData);
    try {
      const newTodo = [todo, ...todos];
      if (userData === undefined) {
        await insertTodo([
          { [searchName]: newTodo, userEmail: getUiInfoStorage().email },
        ]);
      } else {
        await updateTodoServer(
          { [searchName]: newTodo },
          getUiInfoStorage().email
        );
      }
      setTodos(newTodo);
      notify().success("Task added 🥳");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    setLoading(false);
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

    setTodos(items);
    setLoading(true);

    try {
      await updateTodoServer({ [searchName]: items }, getUiInfoStorage().email);
      notify().success("Updated 💥");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    setLoading(false);
  };

  const isComplete = async (id) => {
    let completedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(completedTodo);
    setLoading(true);

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
    setLoading(false);
  };

  const delteTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setLoading(true);

    try {
      await updateTodoServer(
        { [searchName]: updatedTodos },
        getUiInfoStorage().email
      );
      setTodos(updatedTodos);
      notify().success("Deleted !");
    } catch (error) {
      notify().error(
        "An Unknown Error Occurred ! Check Your Internet Connection !"
      );
    }
    setLoading(false);
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
                  <span className="w-1/3 mt-1">
                    <span className="text-2xl ml-10">1/12</span>
                    <div className="text-lg ml-6">Completed</div>
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
                  <span className="w-1/3 mt-1">
                    <span className="text-2xl ml-10">1/12</span>
                    <div className="text-lg ml-6">Completed</div>
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
                  <span className="w-1/3 mt-1">
                    <span className="text-2xl ml-10">1/12</span>
                    <div className="text-lg ml-6">Completed</div>
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
                    <span className="text-3xl mr-8">Groceries</span>
                  </span>
                  <span className="w-1/3 mt-1">
                    <span className="text-2xl ml-3">1/12</span>
                    <div className="text-lg">Completed</div>
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
