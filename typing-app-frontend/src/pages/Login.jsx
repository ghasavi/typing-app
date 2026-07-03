import { useState } from "react";
import { login } from "../services/authService";
import {
    notifySuccess,
    notifyError
} from "../utils/toast";
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const data = await login(username, password);

            // Save JWT
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("username", data.user.username);

            notifySuccess("Login successful!");

            window.location.href = "/home";

        } catch (error) {

            notifyError("Invalid username or password!");

        }

    };

    return (

        <div>

            <h1>Login</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    );

}