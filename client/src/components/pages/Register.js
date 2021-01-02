import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// TODO: Make the cookies stay

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // After form is submitted
    const [isSucess, setIsSuccess] = useState(false);

    // For error messages
    const [flashMessage, setFlashMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setFlashMessage("");
            setFlashMessage("Passwords do not match!");
            setConfirmPassword("");
        } else if (email !== confirmEmail) {
            setFlashMessage("");
            setFlashMessage("Emails do not match!");
        } else {
            axios({
                method: "POST",
                url: "/api/users",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: password,
                },
            })
                .then((res) => {
                    if (res.status === 201) {
                        setIsSuccess(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    return isSucess ? (
        <Redirect to="/login" />
    ) : (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {flashMessage ? (
                    <p style={{ color: "red" }}>{flashMessage}</p>
                ) : null}

                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>

                <label htmlFor="confirmEmail">Confirm Email: </label>
                <input
                    id="confirmEmail"
                    type="text"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />
                <br></br>

                <label htmlFor="firstname">Firstname: </label>
                <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <br></br>

                <label htmlFor="lastname">Lastname: </label>
                <input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <br></br>

                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>

                {/* Password */}
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>

                {/* Confirm Password */}
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br></br>

                <input type="submit" />
            </form>
        </div>
    );
};

export default Register;
