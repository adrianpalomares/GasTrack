import React, { createContext, useContext, useEffect, useState } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import Index from "./components/pages/Index";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import useLocalStorage from "./helper/useLocalStorage";
import Logout from "./components/pages/Logout";

// Where user and accessToken will be passed
export const AuthContext = createContext();

const App = () => {
    // State
    const [accessToken, setAccessToken] = useLocalStorage("accessToken");
    const [user, setUser] = useLocalStorage("user");

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <a className="navbar-brand" href="#">
                    GasTrack
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link">
                                Home<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        {!user ? (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">
                                        Logout
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
            <AuthContext.Provider
                value={{ accessToken, setAccessToken, user, setUser }}
            >
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/" component={Index} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthContext.Provider>
        </Router>
    );
};
export default App;
