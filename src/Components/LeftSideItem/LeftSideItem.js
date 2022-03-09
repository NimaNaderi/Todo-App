import "./../../Styles/index.css";

import { Flex, Heading, background, color } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

export default function LeftSideItem({ children, text, bg, params }) {
  const location = useLocation().search.split("=")[1];
  // EDF2F7;
  return (
    <NavLink
      className={() => (params === location ? "isActive" : null)}
      to={{ pathname: "/main", search: `type=${params}` }}
    >
      <Flex
        className={`hover:bg-slate-700 item`}
        width="full"
        alignItems="center"
        height="49px"
        justifyContent={{
          base: "center",
          md: "flex-start",
          lg: "flex-start",
          xl: "flex-start",
        }}
        pl={{ base: "0px", md: "35px", lg: "35px", xl: "35px" }}
        cursor="pointer"
        mt="1"
        transition=".1s ease-in-out"
        _hover={{ borderLeft: "5px solid", borderColor: "gray.500" }}
      >
        <Flex
          boxSize="28px"
          bg={bg}
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Flex>
        <Heading
          display={{ base: "none", md: "block", lg: "block", xl: "block" }}
          size="sm"
          ml="2"
        >
          {text}
        </Heading>
      </Flex>
    </NavLink>
  );
}
