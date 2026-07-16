import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaKey, FaLock, FaArrowLeft } from "react-icons/fa";

import {
    forgotPassword,
    resetPassword
} from "../services/authService";

import {
    notifySuccess,
    notifyError
} from "../utils/toast";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function sendOtp() {
        if (!email) {
            notifyError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        try {
            const msg = await forgotPassword(email);
            notifySuccess(msg);
            setOtpSent(true);
        } catch (error) {
            notifyError(
                error.response?.data || "Unable to send OTP."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResetPassword() {
        if (!otp || !newPassword) {
            notifyError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            notifyError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        try {
            const msg = await resetPassword(email, otp, newPassword);
            notifySuccess(msg);
            navigate("/login");
        } catch (error) {
            notifyError(
                error.response?.data || "Password reset failed."
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
                    <div className="auth-icon">🔐</div>
                    <h1>Forgot Password</h1>
                    <p className="auth-subtitle">
                        {otpSent
                            ? "Enter the OTP sent to your email"
                            : "We'll send you an OTP to reset your password"}
                    </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); }}>
                    {!otpSent ? (
                        <>
                            <div className="auth-input-group">
                                <FaEnvelope className="auth-input-icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="auth-input"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={sendOtp}
                                className="auth-btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="auth-spinner" />
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="auth-input-group">
                                <FaKey className="auth-input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="auth-input"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="auth-input-group">
                                <FaLock className="auth-input-icon" />
                                <input
                                    type="password"
                                    placeholder="New Password (min 6 characters)"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="auth-input"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="auth-btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="auth-spinner" />
                                        Resetting Password...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>

                            <div style={{ textAlign: "center", marginTop: "16px" }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpSent(false);
                                        setOtp("");
                                        setNewPassword("");
                                    }}
                                    className="auth-link"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        fontSize: "14px"
                                    }}
                                >
                                    ← Resend OTP
                                </button>
                            </div>
                        </>
                    )}
                </form>

                <div className="auth-footer">
                    <p>
                        Remember your password?{" "}
                        <Link to="/login" className="auth-link-bold">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="auth-back-link">
                    <Link to="/" className="auth-link">
                        <FaArrowLeft style={{ marginRight: "6px" }} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}