import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex, color } from "@chakra-ui/react";
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
import { UI_STATE_TYPES } from "../../Context/uiStateReducer";
import { css } from "@emotion/react";
import { localServiceActions } from "../../Services/LocalService/localService";
import profileImage from "../../Assets/Images/profile.png";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useFormFields } from "../../Hooks/Logic/useFormFields";
import { useLanguage } from "./../../Hooks/Logic/useLanguage";
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
  const navigate = useNavigate();
  const { fields, handleChange } = useFormFields({ searched: "" });
  const dispatchUiState = useDispatchUiState();
  const userAccessType = localServiceActions.getItem("userAccessType");
  const { setLanguage, language } = useLanguage();

  useEffect(() => {
    dispatchUiState({
      type: UI_STATE_TYPES.searchedText,
      payload: fields.searched,
    });
  }, [fields]);

  const logoutHandler = () => {
    localServiceActions.removeItem("supabase.auth.token");
    localServiceActions.removeItem("userAccessType");
    localServiceActions.removeItem("uiInfo");
    if (!localServiceActions.getItem("uiInfo")) {
      console.log("Not");
      navigate("/", { replace: true });
    }
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
        {!currentLocation.includes("main") && (
          <svg
            onClick={() =>
              language === "en" ? setLanguage("fa") : setLanguage("en")
            }
            className="w-10 h-10 cursor-pointer"
            style={theme === "light" ? { fill: "#000" } : { fill: "#fff" }}
            viewBox="0 0 640 512"
          >
            <path d="M448 164C459 164 468 172.1 468 184V188H528C539 188 548 196.1 548 208C548 219 539 228 528 228H526L524.4 232.5C515.5 256.1 501.9 279.1 484.7 297.9C485.6 298.4 486.5 298.1 487.4 299.5L506.3 310.8C515.8 316.5 518.8 328.8 513.1 338.3C507.5 347.8 495.2 350.8 485.7 345.1L466.8 333.8C462.4 331.1 457.1 328.3 453.7 325.3C443.2 332.8 431.8 339.3 419.8 344.7L416.1 346.3C406 350.8 394.2 346.2 389.7 336.1C385.2 326 389.8 314.2 399.9 309.7L403.5 308.1C409.9 305.2 416.1 301.1 422 298.3L409.9 286.1C402 278.3 402 265.7 409.9 257.9C417.7 250 430.3 250 438.1 257.9L452.7 272.4L453.3 272.1C465.7 259.9 475.8 244.7 483.1 227.1H376C364.1 227.1 356 219 356 207.1C356 196.1 364.1 187.1 376 187.1H428V183.1C428 172.1 436.1 163.1 448 163.1L448 164zM160 233.2L179 276H140.1L160 233.2zM0 128C0 92.65 28.65 64 64 64H576C611.3 64 640 92.65 640 128V384C640 419.3 611.3 448 576 448H64C28.65 448 0 419.3 0 384V128zM320 384H576V128H320V384zM178.3 175.9C175.1 168.7 167.9 164 160 164C152.1 164 144.9 168.7 141.7 175.9L77.72 319.9C73.24 329.1 77.78 341.8 87.88 346.3C97.97 350.8 109.8 346.2 114.3 336.1L123.2 315.1H196.8L205.7 336.1C210.2 346.2 222 350.8 232.1 346.3C242.2 341.8 246.8 329.1 242.3 319.9L178.3 175.9z" />
          </svg>
        )}

        <ClipLoader
          css={override}
          color={theme === "dark" ? "#fff" : "#000"}
          size={20}
          loading={uiState.loading}
        />
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
          <input
            value={uiState.searchedText}
            placeholder="Search For Todo..."
            name="searched"
            onChange={(e) => handleChange(e)}
            type={"text"}
            className="w-36 h-8 mb-6 mx-3 text-black"
            style={theme === "light" ? { border: "2px solid black" } : null}
          />
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
