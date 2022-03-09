import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

import { Button } from "@chakra-ui/button";
import { CgMenu } from "react-icons/cg";
import { CgSun } from "react-icons/cg";
import { Flex } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import profileImage from "../../Assets/Images/profile.png";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useSetIsMenuOpen } from "../../Context/Providers/MenuState/MenuStateProvider";
import { useTheme } from "../../Hooks/UI/useTheme";

const Header = ({
  toggleColorMode,
  headerSidBarBg,
  headerIconColor,
  BorderColorHeader,
}) => {
  const { theme, setTheme } = useTheme();
  const setIsMenuOpen = useSetIsMenuOpen();
  const [currentLocation] = useCurrentLocation();
  return (
    <Flex
      w="full"
      bg={headerSidBarBg}
      height="52px"
      alignItems="center"
      justifyContent="space-between"
      pr="27px"
      pl="27px"
      borderBottom=".5px solid"
      borderColor={BorderColorHeader}
      position="fixed"
      zIndex="10"
    >
      <Flex alignItems="center">
        {currentLocation.includes("main") && (
          <Button
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            cursor="pointer"
            pr="0"
            pl="0"
            bg="none"
            height="35px"
            as="a"
            iconSpacing
            leftIcon={<CgMenu fontSize="23px" cursor={headerIconColor} />}
          ></Button>
        )}
      </Flex>

      <Flex alignItems="center">
        <Button
          cursor="pointer"
          bg="none"
          as="a"
          p="5px"
          height="35px"
          onClick={() => {
            toggleColorMode();
            setTheme(localStorage.getItem("chakra-ui-color-mode"));
          }}
        >
          <CgSun fontSize="23px" />
        </Button>
        {currentLocation.includes("main") && (
          <Button cursor="pointer" bg="none" as="a" p="5px" height="35px">
            <RiSearch2Line fontSize="23px" />
          </Button>
        )}

        <Link href="https://github.com/NimaNaderi" _focus={{}} isExternal>
          <Avatar
            src={profileImage}
            name="Nima Naderi"
            w="34px"
            h="34px"
            ml="3"
          >
            <AvatarBadge boxSize="1rem" bg="green.500" />
          </Avatar>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
