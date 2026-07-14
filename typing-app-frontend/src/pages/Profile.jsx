import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { getProfile } from "../services/profileService";
import { changePassword } from "../services/authService";
import {
    notifyError,
    notifyInfo
} from "../utils/toast";
import { useTyping } from "../context/TypingContext";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { refreshTrigger } = useTyping();

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error(error);
            }
        }
        loadProfile();
    }, [refreshTrigger]);

    async function handleChangePassword() {
        if (!currentPassword || !newPassword) {
            notifyInfo("Please fill in both password fields.");
            return;
        }

        try {
            const message = await changePassword(
                currentPassword,
                newPassword
            );
            notifyInfo(message);
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            if (error.response) {
                notifyError(error.response.data);
            } else {
                notifyError("Failed to change password.");
            }
        }
    }

    // Get color based on score
    const getScoreColor = (value, type) => {
        if (type === 'wpm') {
            if (value >= 80) return "#b8e6b8";
            if (value >= 60) return "#c7e9c7";
            if (value >= 40) return "#f0e6b8";
            return "#f5d0d0";
        }
        if (type === 'accuracy') {
            if (value >= 95) return "#b8e6b8";
            if (value >= 85) return "#c7e9c7";
            if (value >= 70) return "#f0e6b8";
            return "#f5d0d0";
        }
        return "#e8e0f0";
    };

    if (!profile) {
        return (
            <UserLayout>
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "40px auto",
                        padding: "0 20px",
                    }}
                >
                    <div
                        style={{
                            background: "linear-gradient(135deg, #f8f0ff 0%, #f0f4ff 100%)",
                            borderRadius: "24px",
                            padding: "60px",
                            boxShadow: "0 8px 32px rgba(186, 168, 220, 0.15)",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: "2rem", fontWeight: "600", color: "#6b5b8a" }}>
                            Loading...
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div
                style={{
                    maxWidth: "900px",
                    margin: "40px auto",
                    padding: "0 20px",
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg, #f8f0ff 0%, #f0f4ff 100%)",
                        borderRadius: "24px",
                        padding: "40px",
                        boxShadow: "0 8px 32px rgba(186, 168, 220, 0.15)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "30px",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "2rem",
                                fontWeight: "700",
                                color: "#6b5b8a",
                                margin: 0,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Profile
                        </h1>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "#e8e0f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.2rem",
                                    fontWeight: "600",
                                    color: "#6b5b8a",
                                }}
                            >
                                {profile.username.charAt(0).toUpperCase()}
                            </div>
                            <span
                                style={{
                                    background: "#e8e0f0",
                                    color: "#7a6a9a",
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    fontSize: "0.9rem",
                                    fontWeight: "500",
                                }}
                            >
                                {profile.username}
                            </span>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div style={{ marginBottom: "30px" }}>
                        <h2
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#6b5b8a",
                                marginBottom: "16px",
                                letterSpacing: "-0.3px",
                            }}
                        >
                            Statistics
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        color: "#8a7a9a",
                                        marginBottom: "6px",
                                    }}
                                >
                                    Tests Completed
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                        color: "#4a4a5a",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: "#e8e0f0",
                                            padding: "2px 12px",
                                            borderRadius: "10px",
                                            display: "inline-block",
                                            color: "#5a4a6a",
                                        }}
                                    >
                                        {profile.testsCompleted}
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        color: "#8a7a9a",
                                        marginBottom: "6px",
                                    }}
                                >
                                    Best WPM
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: getScoreColor(profile.bestWpm, 'wpm'),
                                            padding: "2px 12px",
                                            borderRadius: "10px",
                                            display: "inline-block",
                                            color: "#3a4a3a",
                                        }}
                                    >
                                        {profile.bestWpm}
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        color: "#8a7a9a",
                                        marginBottom: "6px",
                                    }}
                                >
                                    Average Accuracy
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: getScoreColor(profile.averageAccuracy, 'accuracy'),
                                            padding: "2px 12px",
                                            borderRadius: "10px",
                                            display: "inline-block",
                                            color: "#3a4a3a",
                                        }}
                                    >
                                        {profile.averageAccuracy}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            height: "2px",
                            background: "linear-gradient(90deg, #e8e0f0, #d8d0e8, #e8e0f0)",
                            margin: "30px 0",
                            borderRadius: "2px",
                        }}
                    />

                    {/* Change Password Section */}
                    <div>
                        <h2
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#6b5b8a",
                                marginBottom: "16px",
                                letterSpacing: "-0.3px",
                            }}
                        >
                            Change Password
                        </h2>
                        <div
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: "12px",
                                padding: "20px",
                            }}
                        >
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "0.85rem",
                                        fontWeight: "500",
                                        color: "#7a6a8a",
                                        marginBottom: "6px",
                                    }}
                                >
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        border: "2px solid #e8e0f0",
                                        fontSize: "1rem",
                                        outline: "none",
                                        transition: "border-color 0.2s",
                                        backgroundColor: "#ffffff",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#c7b8d8";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e8e0f0";
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "0.85rem",
                                        fontWeight: "500",
                                        color: "#7a6a8a",
                                        marginBottom: "6px",
                                    }}
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        border: "2px solid #e8e0f0",
                                        fontSize: "1rem",
                                        outline: "none",
                                        transition: "border-color 0.2s",
                                        backgroundColor: "#ffffff",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#c7b8d8";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e8e0f0";
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleChangePassword}
                                style={{
                                    padding: "12px 24px",
                                    borderRadius: "12px",
                                    border: "none",
                                    background: "linear-gradient(135deg, #d8c8e8, #c8d8f0)",
                                    color: "#5a4a6a",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    width: "100%",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.02)";
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 16px rgba(186, 168, 220, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}