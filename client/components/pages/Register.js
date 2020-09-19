import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:8080/api/users",
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
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <input type="submit" />
            </form>
        </div>
    );
};

export default Register;
