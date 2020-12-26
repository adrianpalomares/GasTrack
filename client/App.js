import { useRoutes } from "hookrouter";
import React from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// TODO: Implemnt context to store accessToken
// const routes = {
//     "/login": () => <Login />,
//     "/register": () => <Register />,
//     "/dashboard": () => <Dashboard />,
// };

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
};
export default App;
