import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import {
    notifySuccess,
    notifyError
} from "../utils/toast";

export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {

        if (!username || !email || !password) {

            notifyError("Please fill in all fields.");

            return;

        }

        try {

            const message = await register(

                username,
                email,
                password

            );

            notifySuccess(message);

            navigate("/login");

        } catch (error) {

            notifyError(

                error.response?.data ||
                "Registration failed."

            );

        }

    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
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

                <button onClick={handleRegister}>

                    Register

                </button>

                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}