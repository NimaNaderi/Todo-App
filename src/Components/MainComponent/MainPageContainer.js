import { Box, Container, Flex } from "@chakra-ui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import {
  getUiInfoStorage,
  isUserAuthenticated,
  localServiceActions,
} from "../../Services/LocalService/localService";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";

import LeftSidBar from "../../Templates/MainPage/LeftSide/LeftSidbare";
import Main from "./Main";
import { selectTodoList } from "../../Services/RemoteService/Actions/selectTodoList";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { useCurrentLocation } from "../../Hooks/Logic/useCurrentLocation";
import { useIsMenuOpen } from "../../Context/Providers/MenuState/MenuStateProvider";
import { useSetModalShowingStateAndType } from "../../Context/Providers/ModalShowingState/ModalShowingStateProvider";

export default function MainPageContainer() {
  const headerSidBarBg = useColorModeValue("white", "#21212B");
  const headerIconColor = useColorModeValue("#2D3748", "#BCBCBF");
  const BorderColorHeader = useColorModeValue("gray.100", "gray.900");
  const MainBg = useColorModeValue("#f8fafd", "#181820");
  const color = useColorModeValue("gray.700", "gray.300");

  const navigate = useNavigate();
  const acceptableAccessTypes = /^(LoggedIn|Guest)$/;
  const setModalShowingState = useSetModalShowingStateAndType();
  const isMenuOpen = useIsMenuOpen();
  const [currentLocation, pathName, search] = useCurrentLocation();

  useLayoutEffect(() => {
    if (currentLocation.includes("main")) {
      localServiceActions.setItem("uiInfo", {
        lastPath: currentLocation,
      });
    }
  }, [search, pathName]);

  useEffect(() => {
    const handleSelect = async () => {
      try {
        // const { email } = supabase.auth.user();
        // const { data, error } = await supabase.from("TodoList").insert([
        //   {
        //     allTodos: [{ a: "1" }, { b: "2" }],
        //     userEmail: email,
        //   },
        // ]);
        // console.log(error);
        // console.log(data);
        // console.log(email);
      } catch (error) {}
    };
    handleSelect();

    setModalShowingState({
      modalType: null,
      isModalShowing: false,
    });

    if (
      !acceptableAccessTypes.test(localServiceActions.getItem("userAccessType"))
    ) {
      !isUserAuthenticated ? navigate("/notFound") : navigate("/main");
    } else navigate(getUiInfoStorage?.lastPath);
  }, []);

  return (
    <>
      <Flex h="full">
        <Box
          style={{
            transform: isMenuOpen ? "translateX(0)" : "translateX(-200px)",
          }}
          flex={1}
          mr={{ base: "0px", sm: "0px", md: "80px", lg: "18px", xl: "0px" }}
        >
          <LeftSidBar
            headerSidBarBg={headerSidBarBg}
            MainBg={MainBg}
            headerIconColor={headerIconColor}
          />
        </Box>

        <Box flex={6}>
          <Main
            MainBg={MainBg}
            headerSidBarBg={headerSidBarBg}
            color={color}
            BorderColorHeader={BorderColorHeader}
            headerIconColor={headerIconColor}
          />
        </Box>
      </Flex>
    </>
  );
}
