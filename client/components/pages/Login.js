import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loggedIn, setLoggedIn] = useState(false);

    const [loginResult, setLoginResult] = useState(false);

    const { accessToken, setAccessToken, user, setUser } = useContext(
        AuthContext
    );

    useEffect(() => {
        if (user) {
            setLoggedIn(true);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:8080/api/auth/token",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            data: {
                username: username,
                password: password,
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    // Set access token to local storage
                    setAccessToken(res.data.accessToken);
                    setLoginResult(true);
                    const decodedToken = jwt.decode(res.data.accessToken);
                    setUser(decodedToken);
                    console.log("from user", user);
                } else {
                    console.log(res);
                    setPassword("");
                }
            })
            .catch((err) => console.log(err));
    };

    return loginResult || loggedIn ? (
        <Redirect to="/dashboard" />
    ) : (
        <div className="container justify-content-center align-items-center text-center">
            <h1>Login</h1>
            <form className="row" onSubmit={handleSubmit}>
                <label htmlFor="usernameInput" className="">
                    Username
                </label>
                <input
                    id="usernameInput"
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Password */}
                <label htmlFor="password" className="">
                    Password
                </label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" className="btn btn-info btn-md mt-4" />
            </form>
        </div>
    );
};

export default Login;
