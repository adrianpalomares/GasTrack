import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../App";

// Can probably use context here? yup
const Logout = () => {
    // Grab context
    const { setAccessToken, setUserId } = React.useContext(AuthContext);

    const [loggedOut, setLoggedOut] = React.useState(false);
    React.useEffect(() => {
        // clear user
        setAccessToken(null);
        setUserId(null);
        setLoggedOut(true);
    }, [setAccessToken, setUserId, setLoggedOut]);

    if (loggedOut) return <Redirect to="/" />;
    return <h1>Logging out...</h1>;
};

export default Logout;
