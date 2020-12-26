import { useRoutes } from "hookrouter";
import React, { createContext, useContext, useState } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// TODO: Implemnt context to store accessToken
export const AuthContext = createContext();

const App = () => {
    // State
    const [accessToken, setAccessToken] = useState();

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
                    </ul>
                </div>
            </nav>
            <AuthContext.Provider value={{ accessToken, setAccessToken }}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthContext.Provider>
        </Router>
    );
};
export default App;
