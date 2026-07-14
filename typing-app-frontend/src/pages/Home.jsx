import { useEffect } from "react";

import UserLayout from "../components/UserLayout";

import DifficultySelector from "../components/DifficultySelector";
import TypingParagraph from "../components/TypingParagraph";
import TypingBox from "../components/TypingBox";
import Timer from "../components/Timer";
import RestartButton from "../components/RestartButton";
import StatsCard from "../components/StatsCard";

import { useTyping } from "../context/TypingContext";
import { getParagraph } from "../services/typingService";

import "../styles/home.css";

export default function Home() {

    const {

        difficulty,
        setParagraph,
        wpm,
        accuracy,
        timeLeft,
        isFinished

    } = useTyping();

    useEffect(() => {

        async function loadParagraph() {

            try {

                const data = await getParagraph(difficulty);

                setParagraph(data.text);

            } catch (error) {

                console.error(error);

            }

        }

        loadParagraph();

    }, [difficulty, setParagraph]);

    return (

        <UserLayout>

            <div className="home-container">

                <div className="home-header">

                    <h1>MizzyType</h1>

                    <p>
                        Improve your typing speed and accuracy.
                    </p>

                </div>

                <div className="top-controls">

                    <DifficultySelector />

                    <Timer />

                </div>

                <div className="typing-card">

                    <TypingParagraph />

                    <TypingBox />

                </div>

                {

                    isFinished &&

                    <h2

                        style={{

                            textAlign: "center",
                            marginTop: "25px",
                            color: "#4caf50"

                        }}

                    >

                        🎉 Test Completed!

                    </h2>

                }

                <div className="stats-row">

                    <StatsCard
                        title="WPM"
                        value={wpm}
                    />

                    <StatsCard
                        title="Accuracy"
                        value={`${accuracy}%`}
                    />

                    <StatsCard
                        title="Time"
                        value={`${timeLeft}s`}
                    />

                </div>

                <div className="restart-row">

                    <RestartButton />

                </div>

            </div>

        </UserLayout>

    );

}