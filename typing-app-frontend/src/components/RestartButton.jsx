import { useTyping } from "../context/TypingContext";
import { getParagraph } from "../services/typingService";
import { FaRedo } from "react-icons/fa";
import { useState } from "react";

export default function RestartButton() {
    const {
        resetTest,
        setParagraph,
        difficulty
    } = useTyping();
    const [isLoading, setIsLoading] = useState(false);

    async function restart() {
        setIsLoading(true);
        resetTest();

        try {
            const data = await getParagraph(difficulty);
            setParagraph(data.text);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={restart}
            disabled={isLoading}
            style={{
                background: isLoading
                    ? "linear-gradient(135deg, #d8ccdc, #c8b8cc)"
                    : "linear-gradient(135deg, #c7b8d8, #b8c8e8)",
                color: "#5a4a6a",
                border: "none",
                borderRadius: "14px",
                padding: "16px 40px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                boxShadow: isLoading
                    ? "0 4px 15px rgba(160, 140, 180, 0.15)"
                    : "0 8px 25px rgba(186, 168, 220, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                opacity: isLoading ? 0.7 : 1,
                transform: isLoading ? "none" : "translateY(0)",
                position: "relative",
                overflow: "hidden"
            }}
            onMouseEnter={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(186, 168, 220, 0.4)";
                }
            }}
            onMouseLeave={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(186, 168, 220, 0.3)";
                }
            }}
            onMouseDown={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = "scale(0.95)";
                }
            }}
            onMouseUp={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                }
            }}
        >
            {/* Shimmer effect */}
            <span
                style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                    transform: "rotate(45deg)",
                    transition: "transform 0.6s ease",
                    pointerEvents: "none"
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = "rotate(45deg) translate(20%, 20%)";
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "rotate(45deg)";
                }}
            />

            {isLoading ? (
                <>
                    <span
                        style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            border: "3px solid rgba(90, 74, 106, 0.2)",
                            borderTop: "3px solid #5a4a6a",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite"
                        }}
                    />
                    Loading...
                </>
            ) : (
                <>
                    <FaRedo style={{ fontSize: "20px" }} />
                    Restart Test
                </>
            )}

            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </button>
    );
}