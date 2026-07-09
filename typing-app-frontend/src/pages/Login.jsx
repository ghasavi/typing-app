import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import {
    notifySuccess,
    notifyError
} from "../utils/toast";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const data = await login(username, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("role", data.user.role);

            notifySuccess("Login successful!");

            if (data.user.role === "ADMIN") {

                navigate("/admin/dashboard");

            } else {

                navigate("/home");

            }

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