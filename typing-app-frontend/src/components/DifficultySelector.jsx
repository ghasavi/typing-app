import { useTyping } from "../context/TypingContext";
import { useState } from "react";
import { FaChevronDown, FaKeyboard } from "react-icons/fa";

export default function DifficultySelector() {
    const { difficulty, setDifficulty } = useTyping();
    const [isOpen, setIsOpen] = useState(false);

    const difficultyOptions = [
        { value: "easy", label: "Easy", icon: "🟢" },
        { value: "medium", label: "Medium", icon: "🟡" },
        { value: "hard", label: "Hard", icon: "🔴" },
        { value: "programming", label: "Programming", icon: "💻" },
        { value: "quotes", label: "Quotes", icon: "💬" }
    ];

    const currentOption = difficultyOptions.find(opt => opt.value === difficulty) || difficultyOptions[0];

    const getDifficultyColor = (value) => {
        const colors = {
            easy: { bg: "#c8e8d8", color: "#3a6a4a", border: "#a7d8c0" },
            medium: { bg: "#f0e0b8", color: "#6a5a3a", border: "#e8d09a" },
            hard: { bg: "#f0d0d8", color: "#6a3a4a", border: "#e8b8c0" },
            programming: { bg: "#d0d8f0", color: "#3a4a6a", border: "#b8c8e8" },
            quotes: { bg: "#e8d8f0", color: "#5a4a6a", border: "#d8c8e8" }
        };
        return colors[value] || colors.easy;
    };

    const currentColors = getDifficultyColor(difficulty);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                marginBottom: "25px",
                position: "relative"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 6px 6px 18px",
                    background: "linear-gradient(145deg, #f5ecf5, #ede4ed)",
                    borderRadius: "14px",
                    border: "1px solid #d8ccdc",
                    boxShadow: "0 4px 15px rgba(160, 140, 180, 0.1)",
                    position: "relative"
                }}
            >
                <FaKeyboard
                    style={{
                        color: "#6b5b8a",
                        fontSize: "18px",
                        opacity: 0.7
                    }}
                />

                {/* Custom Select Trigger */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderRadius: "10px",
                        transition: "all 0.25s ease",
                        background: isOpen ? "rgba(200, 188, 220, 0.15)" : "transparent",
                        minWidth: "140px",
                        justifyContent: "space-between"
                    }}
                    onMouseEnter={(e) => {
                        if (!isOpen) {
                            e.currentTarget.style.background = "rgba(200, 188, 220, 0.08)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isOpen) {
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                >
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#5a4a6a",
                            fontWeight: "600",
                            fontSize: "15px"
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: currentColors.color,
                                boxShadow: `0 0 8px ${currentColors.color}40`
                            }}
                        />
                        {currentOption.icon} {currentOption.label}
                    </span>
                    <FaChevronDown
                        style={{
                            fontSize: "12px",
                            color: "#8a7a9a",
                            transition: "transform 0.3s ease",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                    />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: 0,
                            right: 0,
                            background: "rgba(255, 255, 255, 0.98)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "14px",
                            border: "1px solid #d8ccdc",
                            boxShadow: "0 20px 60px rgba(160, 140, 180, 0.2)",
                            overflow: "hidden",
                            zIndex: 100,
                            animation: "dropdownSlide 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                    >
                        {difficultyOptions.map((option) => {
                            const colors = getDifficultyColor(option.value);
                            const isActive = difficulty === option.value;

                            return (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setDifficulty(option.value);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "12px 18px",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        background: isActive
                                            ? "rgba(200, 188, 220, 0.12)"
                                            : "transparent",
                                        borderLeft: isActive
                                            ? "3px solid #6b5b8a"
                                            : "3px solid transparent",
                                        fontWeight: isActive ? "600" : "500",
                                        color: isActive ? "#5a4a6a" : "#7a6a8a"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "rgba(200, 188, 220, 0.06)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                        }
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: colors.color,
                                            boxShadow: `0 0 8px ${colors.color}30`,
                                            flexShrink: 0
                                        }}
                                    />
                                    <span style={{ fontSize: "16px" }}>{option.icon}</span>
                                    <span style={{ flex: 1 }}>{option.label}</span>
                                    {isActive && (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#6b5b8a",
                                                fontWeight: "700"
                                            }}
                                        >
                                            ✓
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Inline styles for animation */}
            <style>
                {`
                    @keyframes dropdownSlide {
                        from {
                            opacity: 0;
                            transform: translateY(-8px) scale(0.98);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `}
            </style>
        </div>
    );
}