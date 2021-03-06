import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { BsThreeDots } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import TodoForm from "./TodoForm";

const Todo = ({
  todos,
  isComplete,
  removeTodo,
  updateTodo,
  onOpen,
  isOpen,
  onClose,
  headerSidBarBg,
  color,
  BorderColorHeader,
  headerIconColor,
}) => {
  const notify = () => toast.success("Completed 🎉");
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    desc: "",
    isComplete: false,
  });

  const submitHandler = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      desc: "",
      isComplete: false,
    });
  };

  return (
    <Box mt="14" width="full">
      <Heading
        size="md"
        mb="3"
        color={color}
        display={todos.length > 0 ? "block" : "none"}
      >
        {todos.length} {todos.length > 1 ? "Tasks" : "Task"}
      </Heading>
      {edit.id && (
        <TodoForm
          isOpen={isOpen}
          onClose={onClose}
          edit={edit}
          onsubmit={submitHandler}
        />
      )}
      {todos.map((todo) => {
        return (
          <Box
            key={todo.id}
            bg={headerSidBarBg}
            borderRadius="10px"
            border="1px solid"
            borderColor={BorderColorHeader}
            p="1px"
            mt="3"
          >
            <Accordion allowToggle>
              <AccordionItem as="a">
                <Flex alignItems="center">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    width={{ base: "31px", md: "27px", lg: "26px", xl: "26px" }}
                    height="25px"
                    borderRadius="8px"
                    border="2px solid"
                    ml="3"
                    transition=".1s ease-out"
                    cursor="pointer"
                    bg={todo.isComplete ? "#FF95C5" : "transparent"}
                    borderColor="#FF95C5"
                    onClick={() => {
                      isComplete(todo.id);
                      if (todo.isComplete) {
                        setEdit({ ...edit, isComplete: true });
                        notify();
                      } else {
                        setEdit({ ...edit, isComplete: false });
                      }
                    }}
                  >
                    {todo.isComplete ? <HiCheck color="white" /> : null}
                  </Flex>
                  <AccordionButton _hover={{}} as="a" cursor="pointer">
                    <Box
                      flex="1"
                      textAlign="left"
                      display="flex"
                      alignItems="center"
                    >
                      <Heading
                        size="md"
                        mb="1"
                        color={color}
                        as={todo.isComplete ? "s" : "a"}
                      >
                        {todo._title}
                        {/* {todo._addedDate} */}
                      </Heading>
                    </Box>
                    <AccordionIcon mr="-15px" />
                  </AccordionButton>
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
                        color={color}
                        icon={<BiEdit fontSize="17px" />}
                        onClick={() => {
                          onOpen();
                          setEdit({
                            id: todo.id,
                            value: todo._title,
                            desc: todo._desc,
                            isComplete: todo.isComplete,
                          });
                        }}
                      >
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        icon={<BiTrash fontSize="17px" />}
                        color="red.400"
                        onClick={() => removeTodo(todo.id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <AccordionPanel pb={4}>
                  <Text color={color}>{todo._desc}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default Todo;
