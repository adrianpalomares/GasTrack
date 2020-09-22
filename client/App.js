import { useRoutes } from "hookrouter";
import React from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/dashboard": () => <Dashboard />,
};

const App = () => {
    const routeResult = useRoutes(routes);
    return routeResult || <NotFoundPage />;
};
export default App;
