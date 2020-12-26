import { useRoutes } from "hookrouter";
import React, { createContext, useContext, useState } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// TODO: Implemnt context to store accessToken
export const AuthContext = createContext();

const App = () => {
    // State
    const [accessToken, setAccessToken] = useState();

    return (
        <Router>
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
