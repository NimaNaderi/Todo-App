import { Box, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { IoBook } from "react-icons/io5";
import LeftSideItem from "../../../Components/LeftSideItem/LeftSideItem";
import { MdShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import React from "react";
import { RiComputerFill } from "react-icons/ri";
import { SiAddthis } from "react-icons/si";
import { TiUser } from "react-icons/ti";

const LeftSidBar = ({ headerSidBarBg, MainBg, headerIconColor }) => {
  return (
    <Box
      bg={headerSidBarBg}
      height="full"
      pt="14px"
      display="flex"
      flexDirection="column"
      position="fixed"
      zIndex="5"
      w={{ base: "50px", sm: "auto", md: "auto", lg: "auto", xl: "auto" }}
    >
      <Box mt="52px">
        <NavLink
          to={"/main"}
          className={(isActive) =>
            isActive ? "text-yellow-500" : "text-white"
          }
        >
          <Heading
            mb="18px"
            pl="35px"
            mt="5"
            size="md"
            display={{ base: "none", md: "block", lg: "block", xl: "block" }}
          >
            Collections
          </Heading>
        </NavLink>

        <LeftSideItem bg={"#78DEC7"} text={"Personal"} params="personal">
          <TiUser color="white" fontSize="20px" />
        </LeftSideItem>

        <LeftSideItem bg={"#FF95C5"} text={"School"} params="school">
          <IoBook color="white" fontSize="14px" />
        </LeftSideItem>

        <LeftSideItem bg={"#B983FF"} text={"Work"} params="work">
          <RiComputerFill color="white" fontSize="14px" />
        </LeftSideItem>

        <LeftSideItem bg={"#FFD523"} text={"Groceries"} params="groceries">
          <MdShoppingCart color="white" fontSize="14px" />
        </LeftSideItem>
      </Box>
      <Spacer />
      <Button
        visibility={"hidden"}
        mb="2"
        cursor="pointer"
        borderRadius="0"
        bg="none"
        as="a"
        leftIcon={<SiAddthis color={headerIconColor} />}
      >
        <Text display={{ base: "none", md: "block", lg: "block", xl: "block" }}>
          Add New Folder
        </Text>
      </Button>
    </Box>
  );
};

export default LeftSidBar;
