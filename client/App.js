import { useRoutes } from "hookrouter";
import React from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register />,
};

const App = () => {
    const routeResult = useRoutes(routes);
    return routeResult || <NotFoundPage />;
};
export default App;
