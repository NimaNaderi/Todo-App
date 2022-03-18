import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Input } from "@chakra-ui/input";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";

const TodoForm = ({ onClose, isOpen, onsubmit, edit, headerSidBarBg }) => {
  const [title, setTitle] = useState(edit ? edit.value : "");
  const [desc, setDesc] = useState(edit ? edit.desc : "");
  const [currentLocation, pathName, search] = useCurrentLocation();
  const searchName = search.split("=")[1];
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onsubmit({
      id: edit ? edit.id : Math.floor(Math.random() * 1282372837287),
      _title: title,
      _desc: desc,
      _taskCategory: searchName,
      isComplete: edit ? edit.isComplete : false,
    });

    setTitle("");
    setDesc("");
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg={headerSidBarBg}>
          <ModalHeader>{edit ? "Update Task" : "Add a Todo"}</ModalHeader>
          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl mt="2">
                <FormLabel>
                  {edit ? "Update your title" : "Enter your title"}
                </FormLabel>
                <Input
                  onChange={titleHandler}
                  type="text"
                  placeholder="Title"
                  value={title}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>
                  {edit ? "Update description" : "Description"}
                </FormLabel>
                <Input
                  onChange={descHandler}
                  type="text"
                  placeholder="Description"
                  value={desc}
                />
              </FormControl>
              <Flex mt={6} mb={1} justifyContent="flex-end">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  _hover={{ bg: "#fd70af" }}
                  bg="#FF95C5"
                  color="white"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {edit ? "Update Task" : "Add Task"}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoForm;
