import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import ModalShowingStateProvider from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";
import ProvidersContainer from "./Context/ProvidersContainer";

ReactDOM.render(
  <ProvidersContainer>
    <App />
  </ProvidersContainer>,
  document.getElementById("root")
);
