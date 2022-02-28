import "./Styles/index.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ModalShowingStateProvider from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";
import ProvidersContainer from "./Context/ProvidersContainer";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <BrowserRouter>
    <ProvidersContainer>
      <App />
    </ProvidersContainer>
  </BrowserRouter>,
  document.getElementById("root")
);
