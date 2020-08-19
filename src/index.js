import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import dotenv from "dotenv";

import { ContextProvider } from "./context/Context";
import { ResourceContextProvider } from "./context/ResourceContext";

import App from "./App";

dotenv.config();

ReactDOM.render(
  <ContextProvider>
    <ResourceContextProvider>
      <Router>
        <App />
      </Router>
    </ResourceContextProvider>
  </ContextProvider>,
  document.getElementById("root")
);
