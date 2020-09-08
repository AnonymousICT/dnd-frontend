import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Spells from "./components/Spells";
import Equipment from "./components/Equipment";
import Characters from "./components/Characters";
import CreateCharacter from "./components/Characters/CreateCharacter/CreateCharacter";
import EditCharacter from "./components/Characters/EditCharacter/EditCharacter";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./App.scss";
import User from "./components/User/User";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#eaa260",
        },
        secondary: {
            main: "#31a065",
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="Hero">
                    <header>
                        <h1>D&D CG</h1>
                        <h3>
                            <span>5th edition</span> character generator
                        </h3>
                        <Navbar />
                    </header>
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/spells">
                                <Spells />
                            </Route>
                            <Route path="/equipment">
                                <Equipment />
                            </Route>
                            <Route path="/characters">
                                <Characters />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/createCharacter">
                                <CreateCharacter />
                            </Route>
                            <Route path="/character/edit">
                                <EditCharacter />
                            </Route>
                            <Route path="/user">
                                <User />
                            </Route>
                        </Switch>
                    </main>
                    {/* <footer>
                        <p>
                            Art assets are courtesy of{" "}
                            <a
                                href="https://www.melissapalacios.com/"
                                target="blank"
                            >
                                Melissa Palacios
                            </a>
                        </p>
                    </footer> */}
                </div>
            </div>
        </ThemeProvider>
    );
}
