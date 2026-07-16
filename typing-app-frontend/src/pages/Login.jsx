import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaUser, FaLock, FaGoogle, FaSignInAlt } from "react-icons/fa";

import { login } from "../services/authService";
import {
    notifySuccess,
    notifyError
} from "../utils/toast";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function saveUser(data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role);
    }

    function redirect(role) {
        if (role === "ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/home");
        }
    }

    async function handleLogin() {
        if (!username || !password) {
            notifyError("Please enter your username and password.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await login(username, password);
            saveUser(data);
            notifySuccess("Welcome back!");
            redirect(data.user.role);
        } catch (error) {
            notifyError(
                error.response?.data || "Invalid username or password."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleLogin(credentialResponse) {
        setIsLoading(true);
        try {
            const response = await fetch(
                "http://localhost:8081/api/auth/google",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        credential: credentialResponse.credential
                    })
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            saveUser(data);
            notifySuccess("Google Login Successful!");
            redirect(data.user.role);
        } catch (error) {
            notifyError("Google Login Failed.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Decorative top bar */}
                <div className="auth-card-topbar" />

                <div className="auth-header">
                    <div className="auth-icon">⌨️</div>
                    <h1>Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to continue typing</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="auth-input-group">
                        <FaUser className="auth-input-icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-input-group">
                        <FaLock className="auth-input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="auth-spinner" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt />
                                Login
                            </>
                        )}
                    </button>
                </form>

                {/* Forgot Password Link - Single */}
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <Link to="/forgot-password" className="auth-link">
                        Forgot Password?
                    </Link>
                </div>

                <div className="auth-divider">
                    <span>or continue with</span>
                </div>

                <div className="auth-google-wrapper">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => notifyError("Google Login Failed")}
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="pill"
                        logo_alignment="center"
                    />
                </div>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="auth-link-bold">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}