export default function RecentTests({ results }) {
    // Get difficulty badge color
    const getDifficultyColor = (difficulty) => {
        const colors = {
            easy: { bg: "#c8e8d8", color: "#3a6a4a" },
            medium: { bg: "#f0e0b8", color: "#6a5a3a" },
            hard: { bg: "#f0d0d8", color: "#6a3a4a" }
        };
        return colors[difficulty?.toLowerCase()] || colors.easy;
    };

    // Get WPM color based on score
    const getWpmColor = (wpm) => {
        if (wpm >= 80) return "#4a8a5a";
        if (wpm >= 60) return "#6a7a3a";
        if (wpm >= 40) return "#8a7a3a";
        return "#b85a5a";
    };

    // Get accuracy color based on score
    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 95) return "#4a8a5a";
        if (accuracy >= 85) return "#6a7a3a";
        if (accuracy >= 70) return "#8a7a3a";
        return "#b85a5a";
    };

    return (
        <div
            style={{
                background: "linear-gradient(145deg, #f5ecf5, #ede4ed)",
                marginTop: "40px",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid #d8ccdc",
                boxShadow: "0 4px 15px rgba(160, 140, 180, 0.1)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Decorative gradient line at top */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #c7b8d8, #b8c8e8, #c7b8d8)",
                    opacity: 0.6
                }}
            />

            {/* Header with results count */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                    gap: "10px"
                }}
            >
                <h2
                    style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#5a4a6a",
                        margin: 0,
                        letterSpacing: "-0.3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <span style={{ fontSize: "24px" }}>📝</span>
                    Recent Tests
                </h2>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        background: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "10px",
                        border: "1px solid #e8e0f0"
                    }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            color: "#8a7a9a",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.3px"
                        }}
                    >
                        Showing
                    </span>
                    <span
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#5a4a6a"
                        }}
                    >
                        {Math.min(results.length, 5)} of {results.length}
                    </span>
                </div>
            </div>

            {/* Table */}
            {results.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 20px",
                        color: "#8a7a9a",
                        textAlign: "center"
                    }}
                >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
                    <h3 style={{ color: "#7a6a8a", marginBottom: "8px", fontSize: "18px" }}>
                        No Tests Completed Yet
                    </h3>
                    <p style={{ color: "#9a8aaa", fontSize: "14px" }}>
                        Complete a typing test to see your recent results here
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        overflowX: "auto",
                        borderRadius: "12px",
                        border: "1px solid #e8e0f0"
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "rgba(255, 255, 255, 0.4)"
                        }}
                    >
                        <thead>
                        <tr>
                            <th
                                style={{
                                    textAlign: "left",
                                    padding: "14px 20px",
                                    color: "#7a6a8a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderBottom: "2px solid #d8ccdc",
                                    background: "rgba(232, 220, 232, 0.3)"
                                }}
                            >
                                Date
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    padding: "14px 20px",
                                    color: "#7a6a8a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderBottom: "2px solid #d8ccdc",
                                    background: "rgba(232, 220, 232, 0.3)"
                                }}
                            >
                                Difficulty
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    padding: "14px 20px",
                                    color: "#7a6a8a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderBottom: "2px solid #d8ccdc",
                                    background: "rgba(232, 220, 232, 0.3)"
                                }}
                            >
                                WPM
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    padding: "14px 20px",
                                    color: "#7a6a8a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderBottom: "2px solid #d8ccdc",
                                    background: "rgba(232, 220, 232, 0.3)"
                                }}
                            >
                                Accuracy
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    padding: "14px 20px",
                                    color: "#7a6a8a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderBottom: "2px solid #d8ccdc",
                                    background: "rgba(232, 220, 232, 0.3)"
                                }}
                            >
                                Time
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.slice(0, 5).map((result, index) => {
                            const difficultyColors = getDifficultyColor(result.difficulty);
                            const wpmColor = getWpmColor(result.wpm);
                            const accuracyColor = getAccuracyColor(result.accuracy);

                            return (
                                <tr
                                    key={result.id}
                                    style={{
                                        borderTop: index === 0 ? "none" : "1px solid #e8e0f0",
                                        height: "55px",
                                        transition: "background 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(200, 188, 220, 0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "12px 20px",
                                            color: "#5a4a6a",
                                            fontSize: "14px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {new Date(result.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td align="center" style={{ padding: "12px 20px" }}>
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    padding: "4px 14px",
                                                    borderRadius: "12px",
                                                    background: difficultyColors.bg,
                                                    color: difficultyColors.color,
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {result.difficulty ?? "Easy"}
                                            </span>
                                    </td>
                                    <td
                                        align="center"
                                        style={{
                                            padding: "12px 20px",
                                            color: wpmColor,
                                            fontWeight: "700",
                                            fontSize: "18px"
                                        }}
                                    >
                                        {result.wpm}
                                    </td>
                                    <td
                                        align="center"
                                        style={{
                                            padding: "12px 20px",
                                            color: accuracyColor,
                                            fontWeight: "600",
                                            fontSize: "16px"
                                        }}
                                    >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    padding: "2px 10px",
                                                    borderRadius: "8px",
                                                    background: `${accuracyColor}15`,
                                                    color: accuracyColor
                                                }}
                                            >
                                                {result.accuracy}%
                                            </span>
                                    </td>
                                    <td
                                        align="center"
                                        style={{
                                            padding: "12px 20px",
                                            color: "#6a5a7a",
                                            fontWeight: "500",
                                            fontSize: "14px"
                                        }}
                                    >
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px"
                                                }}
                                            >
                                                <span style={{ fontSize: "16px" }}>⏱️</span>
                                                {result.time}s
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer with view all link if there are more results */}
            {results.length > 5 && (
                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        paddingTop: "16px",
                        borderTop: "1px solid #e8e0f0"
                    }}
                >
                    <span
                        style={{
                            color: "#7a6a8a",
                            fontSize: "13px",
                            fontWeight: "500"
                        }}
                    >
                        Showing 5 of {results.length} tests
                    </span>
                </div>
            )}
        </div>
    );
}