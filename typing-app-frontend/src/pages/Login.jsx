import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { login } from "../services/authService";
import {

    notifySuccess,
    notifyError

} from "../utils/toast";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function saveUser(data) {

        localStorage.setItem(

            "token",

            data.token

        );

        localStorage.setItem(

            "userId",

            data.user.id

        );

        localStorage.setItem(

            "username",

            data.user.username

        );

        localStorage.setItem(

            "role",

            data.user.role

        );

    }

    function redirect(role) {

        if (role === "ADMIN") {

            navigate("/admin/dashboard");

        }

        else {

            navigate("/home");

        }

    }

    async function handleLogin() {

        if (!username || !password) {

            notifyError(

                "Please enter your username and password."

            );

            return;

        }

        try {

            const data = await login(

                username,

                password

            );

            saveUser(data);

            notifySuccess("Welcome back!");

            redirect(data.user.role);

        }

        catch (error) {

            notifyError(

                error.response?.data ||

                "Invalid username or password."

            );

        }

    }

    async function handleGoogleLogin(credentialResponse) {

        try {

            const response = await fetch(

                "http://localhost:8081/api/auth/google",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        credential:

                        credentialResponse.credential

                    })

                }

            );

            if (!response.ok) {

                throw new Error();

            }

            const data = await response.json();

            saveUser(data);

            notifySuccess(

                "Google Login Successful!"

            );

            redirect(data.user.role);

        }

        catch (error) {

            notifyError(

                "Google Login Failed."

            );

        }

    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <input

                    type="text"

                    placeholder="Username"

                    value={username}

                    onChange={(e) =>

                        setUsername(e.target.value)

                    }

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>

                        setPassword(e.target.value)

                    }

                />

                <button onClick={handleLogin}>

                    Login

                </button>

                <div

                    style={{

                        marginTop: "20px",

                        display: "flex",

                        justifyContent: "center"

                    }}

                >

                    <GoogleLogin

                        onSuccess={handleGoogleLogin}

                        onError={() =>

                            notifyError(

                                "Google Login Failed"

                            )

                        }

                    />

                </div>

                <p

                    style={{

                        marginTop: "20px"

                    }}

                >

                    <Link to="/forgot-password">

                        Forgot Password?

                    </Link>

                </p>

                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}