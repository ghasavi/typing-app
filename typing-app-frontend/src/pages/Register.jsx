import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
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
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister() {
        if (!username || !email || !password) {
            notifyError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            notifyError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        try {
            const message = await register(username, email, password);
            notifySuccess(message);
            navigate("/login");
        } catch (error) {
            notifyError(
                error.response?.data || "Registration failed."
            );
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
                    <div className="auth-icon">✍️</div>
                    <h1>Create Account</h1>
                    <p className="auth-subtitle">Start your typing journey today</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
                        <FaEnvelope className="auth-input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-input-group">
                        <FaLock className="auth-input-icon" />
                        <input
                            type="password"
                            placeholder="Password (min 6 characters)"
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
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <FaUserPlus />
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="auth-link-bold">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="auth-back-link">
                    <Link to="/" className="auth-link">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}