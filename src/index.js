import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import dotenv from "dotenv";

import { ContextProvider } from "./context/Context";

import App from "./App";

dotenv.config();

ReactDOM.render(
    <ContextProvider>
        <Router>
            <App />
        </Router>
    </ContextProvider>,
    document.getElementById("root")
);
