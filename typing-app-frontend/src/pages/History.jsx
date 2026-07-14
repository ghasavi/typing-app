import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { useTyping } from "../context/TypingContext";
import api from "../api/axios";

export default function History() {
    const [results, setResults] = useState([]);
    const { refreshTrigger } = useTyping();

    useEffect(() => {
        loadHistory();
    }, [refreshTrigger]);

    async function loadHistory() {
        try {
            const response = await api.get("/results/my-results");
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Get color based on WPM score
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
                            Typing History
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
                            {results.length} attempts
                        </span>
                    </div>

                    {results.length === 0 ? (
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
                                Complete a typing test to see your history here
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
                                    {["#", "WPM", "Accuracy", "Time", "Date"].map((header) => (
                                        <th
                                            key={header}
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
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((result, index) => (
                                    <tr
                                        key={result.id}
                                        style={{
                                            backgroundColor: "#ffffff",
                                            borderRadius: "12px",
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
                                        <td
                                            style={{
                                                padding: "14px 16px",
                                                color: "#7a6a8a",
                                                fontWeight: "500",
                                                borderTopLeftRadius: "12px",
                                                borderBottomLeftRadius: "12px",
                                            }}
                                        >
                                            #{index + 1}
                                        </td>
                                        <td
                                            style={{
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                            }}
                                        >
                                                <span
                                                    style={{
                                                        background: getWpmColor(result.wpm),
                                                        padding: "4px 12px",
                                                        borderRadius: "12px",
                                                        display: "inline-block",
                                                        color: "#4a5a4a",
                                                        fontSize: "0.95rem",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {result.wpm}
                                                </span>
                                        </td>
                                        <td
                                            style={{
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                            }}
                                        >
                                                <span
                                                    style={{
                                                        background: getAccuracyColor(result.accuracy),
                                                        padding: "4px 12px",
                                                        borderRadius: "12px",
                                                        display: "inline-block",
                                                        color: "#4a5a4a",
                                                        fontSize: "0.95rem",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {result.accuracy}%
                                                </span>
                                        </td>
                                        <td
                                            style={{
                                                padding: "14px 16px",
                                                color: "#7a7a8a",
                                            }}
                                        >
                                                <span style={{ fontWeight: "500" }}>
                                                    {result.time}s
                                                </span>
                                        </td>
                                        <td
                                            style={{
                                                padding: "14px 16px",
                                                color: "#8a8a9a",
                                                fontSize: "0.9rem",
                                                borderTopRightRadius: "12px",
                                                borderBottomRightRadius: "12px",
                                            }}
                                        >
                                            {result.createdAt
                                                ? new Date(result.createdAt).toLocaleString()
                                                : "-"}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}