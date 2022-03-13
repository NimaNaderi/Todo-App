import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  useDispatchUiState,
  useUiState,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

import { Button } from "@chakra-ui/button";
import { CgMenu } from "react-icons/cg";
import { CgSun } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { Flex } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import { UI_STATE_TYPES } from "../../Context/uiStateReducer";
import { css } from "@emotion/react";
import { localServiceActions } from "../../Services/LocalService/localService";
import profileImage from "../../Assets/Images/profile.png";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useNavigate } from "react-router-dom";
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
  const [currentLocation, pathName, search] = useCurrentLocation();
  const uiState = useUiState();
  const dispatchUiState = useDispatchUiState();
  const navigate = useNavigate();
  const userAccessType = localServiceActions.getItem("userAccessType");

  const logoutHandler = () => {
    localServiceActions.removeItem("supabase.auth.token");
    localServiceActions.removeItem("userAccessType");
    localServiceActions.removeItem("uiInfo");
    navigate("/");
  };

  const renderLogout = () => {
    if (currentLocation !== "/welcome") {
      if (userAccessType === "LoggedIn") {
        return (
          <Button
            onClick={logoutHandler}
            title="Logout"
            cursor="pointer"
            bg="none"
            as="a"
            p="5px"
            mr="2px"
          >
            <svg className="fill-red-500 w-6" viewBox="0 0 512 512">
              <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
            </svg>
          </Button>
        );
      } else if (userAccessType === "Guest") {
        return (
          <Button
            onClick={logoutHandler}
            title="Back"
            cursor="pointer"
            bg="none"
            as="a"
            p="5px"
            mr="2px"
          >
            <svg className="fill-red-500 w-6" viewBox="0 0 512 512">
              <path d="M40 16C53.25 16 64 26.75 64 40v102.1C103.7 75.57 176.3 32.11 256.1 32.11C379.6 32.11 480 132.5 480 256s-100.4 223.9-223.9 223.9c-52.31 0-103.3-18.33-143.5-51.77c-10.19-8.5-11.56-23.62-3.062-33.81c8.5-10.22 23.66-11.56 33.81-3.062C174.9 417.5 214.9 432 256 432c97.03 0 176-78.97 176-176S353 80 256 80c-66.54 0-126.8 38.28-156.5 96H200C213.3 176 224 186.8 224 200S213.3 224 200 224h-160C26.75 224 16 213.3 16 200v-160C16 26.75 26.75 16 40 16z" />
            </svg>
          </Button>
        );
      }
    }
  };
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
        {renderLogout()}
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
        {search && (
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
            ml="5px"
          >
            <AvatarBadge boxSize="1rem" bg="green.500" />
          </Avatar>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
