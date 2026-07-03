import { useEffect } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TypingArea from "../components/TypingArea";
import TypingParagraph from "../components/TypingParagraph";
import Timer from "../components/Timer";
import RestartButton from "../components/RestartButton";
import { useTyping } from "../context/TypingContext";
import { getParagraph } from "../services/typingService";
import DifficultySelector from "../components/DifficultySelector";

export default function Home() {

    const {
        setParagraph,
        difficulty,
        wpm,
        accuracy,
        timeLeft
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

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "40px auto",
                    padding: "20px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "42px",
                        marginBottom: "10px"
                    }}
                >
                    Welcome to TypingPro
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "18px",
                        marginBottom: "35px"
                    }}
                >
                    Improve your typing speed and accuracy.
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "30px"
                    }}
                >
                    <DifficultySelector />
                    <Timer />
                </div>

                {timeLeft === 0 && (

                    <h2
                        style={{
                            textAlign: "center",
                            color: "#ef4444",
                            marginBottom: "30px"
                        }}
                    >
                        🎉 Test Finished! Click Restart to try again.
                    </h2>

                )}

                <TypingParagraph />

                <div
                    style={{
                        marginTop: "30px"
                    }}
                >
                    <TypingArea />
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        marginTop: "45px",
                        flexWrap: "wrap"
                    }}
                >

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
                        value={timeLeft}
                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "45px"
                    }}
                >
                    <RestartButton />
                </div>

            </div>

        </>

    );

}