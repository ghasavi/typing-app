import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { getMyResults } from "../services/statisticsService";
import { useTyping } from "../context/TypingContext";

export default function Statistics() {
    const [stats, setStats] = useState({
        bestWpm: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        testsCompleted: 0,
        username: ""
    });

    const { refreshTrigger } = useTyping();

    useEffect(() => {
        async function loadStatistics() {
            try {
                const results = await getMyResults();

                if (results.length === 0) {
                    return;
                }

                const username = results[0].user.username;
                const bestWpm = Math.max(...results.map(r => r.wpm));
                const averageWpm =
                    results.reduce((sum, r) => sum + r.wpm, 0) / results.length;
                const averageAccuracy =
                    results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;

                setStats({
                    username,
                    bestWpm,
                    averageWpm: averageWpm.toFixed(1),
                    averageAccuracy: averageAccuracy.toFixed(1),
                    testsCompleted: results.length
                });
            } catch (error) {
                console.error(error);
            }
        }

        loadStatistics();
    }, [refreshTrigger]);

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
                            Statistics
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
                            {stats.testsCompleted} tests
                        </span>
                    </div>

                    {stats.testsCompleted === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "60px 20px",
                                color: "#a090b0",
                                fontSize: "1.1rem",
                            }}
                        >
                            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                                📝
                            </div>
                            <p style={{ margin: 0 }}>No typing results yet</p>
                            <p style={{ fontSize: "0.9rem", marginTop: "8px", color: "#b8a8c8" }}>
                                Complete a typing test to see your statistics
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* User Info */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "30px",
                                    padding: "16px 20px",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    borderRadius: "12px",
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
                                    {stats.username.charAt(0).toUpperCase()}
                                </div>
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "500",
                                        color: "#6b5b8a",
                                    }}
                                >
                                    {stats.username}
                                </span>
                            </div>

                            {/* Stats Grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    gap: "16px",
                                }}
                            >
                                {/* Best WPM */}
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        cursor: "default",
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
                                    <div
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            color: "#8a7a9a",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Best WPM
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: getScoreColor(stats.bestWpm, 'wpm'),
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                display: "inline-block",
                                                color: "#3a4a3a",
                                            }}
                                        >
                                            {stats.bestWpm}
                                        </span>
                                    </div>
                                </div>

                                {/* Average WPM */}
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        cursor: "default",
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
                                    <div
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            color: "#8a7a9a",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Average WPM
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: getScoreColor(parseFloat(stats.averageWpm), 'wpm'),
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                display: "inline-block",
                                                color: "#3a4a3a",
                                            }}
                                        >
                                            {stats.averageWpm}
                                        </span>
                                    </div>
                                </div>

                                {/* Average Accuracy */}
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        cursor: "default",
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
                                    <div
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            color: "#8a7a9a",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Average Accuracy
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: getScoreColor(parseFloat(stats.averageAccuracy), 'accuracy'),
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                display: "inline-block",
                                                color: "#3a4a3a",
                                            }}
                                        >
                                            {stats.averageAccuracy}%
                                        </span>
                                    </div>
                                </div>

                                {/* Tests Completed */}
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        cursor: "default",
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
                                    <div
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            color: "#8a7a9a",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Tests Completed
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: "700",
                                            color: "#4a4a5a",
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: "#e8e0f0",
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                display: "inline-block",
                                                color: "#5a4a6a",
                                            }}
                                        >
                                            {stats.testsCompleted}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}