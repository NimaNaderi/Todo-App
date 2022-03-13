import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  useDispatchUiState,
  useLoading,
  useSetLoading,
  useUiState,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

import { Button } from "@chakra-ui/button";
import { CgMenu } from "react-icons/cg";
import { CgSun } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { DeviceThermostatOutlined } from "@mui/icons-material";
import { Flex } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import { UI_STATE_TYPES } from "../../Context/uiStateReducer";
import { css } from "@emotion/react";
import profileImage from "../../Assets/Images/profile.png";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useLoadingBarData } from "../../Hooks/UI/useLoadingBarData";
import { useSetIsMenuOpen } from "../../Context/Providers/MenuState/MenuStateProvider";
import { useTheme } from "../../Hooks/UI/useTheme";

const override = css`
  display: block;
  margin-left: 15px;
`;

const Header = ({
  toggleColorMode,
  headerSidBarBg,
  headerIconColor,
  BorderColorHeader,
}) => {
  const { setTheme, theme } = useTheme();
  const setIsMenuOpen = useSetIsMenuOpen();
  const [currentLocation] = useCurrentLocation();
  const uiState = useUiState();
  const dispatchUiState = useDispatchUiState();
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
            pl="0"
            bg="none"
            height="35px"
            as="a"
            iconSpacing
            leftIcon={
              <CgMenu
                className="ml-3"
                fontSize="23px"
                cursor={headerIconColor}
              />
            }
          ></Button>
        )}
        <ClipLoader
          css={override}
          color={theme === "dark" ? "#fff" : "#000"}
          size={20}
          loading={uiState.loading}
        />
        {uiState.error && (
          <svg
            onClick={() => {
              return dispatchUiState({
                type: UI_STATE_TYPES.shouldReRender,
                payload: true,
              });
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 hover:cursor-pointer fill-red-600"
          >
            <path d="M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z" />
          </svg>
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
        {currentLocation !== "/main" && (
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
