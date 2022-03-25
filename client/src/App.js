import React, { createContext } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import Index from "./components/pages/Index";
import Cars from "./components/pages/Cars";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import useLocalStorage from "./helper/useLocalStorage";
import Logout from "./components/pages/Logout";

// Where user and accessToken will be passed
export const AuthContext = createContext();

const App = () => {
    // State
    const [accessToken, setAccessToken] = useLocalStorage("accessToken");
    const [userId, setUserId] = useLocalStorage("userId");
    const [username, setUsername] = useLocalStorage("username");
    const [email, setEmail] = useLocalStorage("email");
    const [fullName, setFullName] = useLocalStorage("fullName");

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <Link to="/" className="navbar-brand">
                    GasTrack
                </Link>
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
                                Dashboard
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        {!userId ? (
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
                                    <Link to="/cars" className="nav-link">
                                        My Cars
                                    </Link>
                                </li>

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
            {/* TODO: fill out other values in context */}
            <AuthContext.Provider
                value={{
                    accessToken,
                    setAccessToken,
                    userId,
                    setUserId,
                    username,
                    setUsername,
                    email,
                    setEmail,
                    fullName,
                    setFullName,
                }}
            >
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/cars" component={Cars} />
                    <Route exact path="/" component={Index} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;
