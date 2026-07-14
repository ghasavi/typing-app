import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { useTyping } from "../context/TypingContext";
import api from "../api/axios";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const { refreshTrigger } = useTyping();

    useEffect(() => {
        loadLeaderboard();
    }, [refreshTrigger]);

    async function loadLeaderboard() {
        try {
            const response = await api.get("/results/leaderboard");
            setLeaders(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Get medal emoji for top 3
    const getMedal = (index) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return null;
    };

    // Get color for rank
    const getRankColor = (index) => {
        if (index === 0) return "#ffd700";
        if (index === 1) return "#c0c0c0";
        if (index === 2) return "#cd7f32";
        return "#e8e0f0";
    };

    // Get color based on WPM
    const getWpmColor = (wpm) => {
        if (wpm >= 80) return "#b8e6b8";
        if (wpm >= 60) return "#c7e9c7";
        if (wpm >= 40) return "#f0e6b8";
        return "#f5d0d0";
    };

    // Get color based on accuracy
    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 95) return "#b8e6b8";
        if (accuracy >= 85) return "#c7e9c7";
        if (accuracy >= 70) return "#f0e6b8";
        return "#f5d0d0";
    };

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
                            Leaderboard
                        </h1>
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
                            Top {leaders.length} players
                        </span>
                    </div>

                    {leaders.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "60px 20px",
                                color: "#a090b0",
                                fontSize: "1.1rem",
                            }}
                        >
                            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                                🏆
                            </div>
                            <p style={{ margin: 0 }}>No leaderboard data yet</p>
                            <p style={{ fontSize: "0.9rem", marginTop: "8px", color: "#b8a8c8" }}>
                                Complete a typing test to appear on the leaderboard
                            </p>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "separate",
                                    borderSpacing: "0 8px",
                                }}
                            >
                                <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "12px 16px",
                                            color: "#8a7a9a",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            backgroundColor: "transparent",
                                            borderBottom: "2px solid #e8e0f0",
                                        }}
                                    >
                                        Rank
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "12px 16px",
                                            color: "#8a7a9a",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            backgroundColor: "transparent",
                                            borderBottom: "2px solid #e8e0f0",
                                        }}
                                    >
                                        User
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "12px 16px",
                                            color: "#8a7a9a",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            backgroundColor: "transparent",
                                            borderBottom: "2px solid #e8e0f0",
                                        }}
                                    >
                                        WPM
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "12px 16px",
                                            color: "#8a7a9a",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            backgroundColor: "transparent",
                                            borderBottom: "2px solid #e8e0f0",
                                        }}
                                    >
                                        Accuracy
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaders.map((user, index) => {
                                    const medal = getMedal(index);
                                    const rankColor = getRankColor(index);

                                    return (
                                        <tr
                                            key={user.id}
                                            style={{
                                                backgroundColor: "#ffffff",
                                                borderRadius: "12px",
                                                transition: "transform 0.2s, box-shadow 0.2s",
                                                cursor: "default",
                                                ...(index < 3 && {
                                                    background: `linear-gradient(90deg, ${rankColor}15, #ffffff)`,
                                                }),
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.02)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 4px 16px rgba(186, 168, 220, 0.2)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            <td
                                                style={{
                                                    padding: "14px 16px",
                                                    fontWeight: "600",
                                                    borderTopLeftRadius: "12px",
                                                    borderBottomLeftRadius: "12px",
                                                }}
                                            >
                                                    <span
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "50%",
                                                            background: rankColor,
                                                            color: index < 3 ? "#ffffff" : "#7a6a8a",
                                                            fontWeight: "700",
                                                            fontSize: index < 3 ? "1.2rem" : "0.9rem",
                                                        }}
                                                    >
                                                        {medal || index + 1}
                                                    </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "14px 16px",
                                                    fontWeight: "500",
                                                    color: "#5a4a6a",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "50%",
                                                            background: "#e8e0f0",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: "0.9rem",
                                                            fontWeight: "600",
                                                            color: "#6b5b8a",
                                                        }}
                                                    >
                                                        {user.user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{user.user.username}</span>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "14px 16px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                    <span
                                                        style={{
                                                            background: getWpmColor(user.wpm),
                                                            padding: "4px 12px",
                                                            borderRadius: "12px",
                                                            display: "inline-block",
                                                            color: "#3a4a3a",
                                                            fontWeight: "600",
                                                            fontSize: "0.95rem",
                                                        }}
                                                    >
                                                        {user.wpm}
                                                    </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "14px 16px",
                                                    fontWeight: "600",
                                                    borderTopRightRadius: "12px",
                                                    borderBottomRightRadius: "12px",
                                                }}
                                            >
                                                    <span
                                                        style={{
                                                            background: getAccuracyColor(user.accuracy),
                                                            padding: "4px 12px",
                                                            borderRadius: "12px",
                                                            display: "inline-block",
                                                            color: "#3a4a3a",
                                                            fontWeight: "600",
                                                            fontSize: "0.95rem",
                                                        }}
                                                    >
                                                        {user.accuracy}%
                                                    </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}