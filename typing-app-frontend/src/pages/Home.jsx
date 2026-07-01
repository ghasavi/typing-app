import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TypingBox from "../components/TypingBox";
import Timer from "../components/Timer";
import { getParagraph } from "../services/typingService";

export default function Home() {

    const [paragraph, setParagraph] = useState("");

    const loadParagraph = async () => {

        try {

            const data = await getParagraph();
            setParagraph(data.text);

        } catch (error) {

            console.error("Failed to load paragraph:", error);

        }

    };

    useEffect(() => {

        loadParagraph();

    }, []);

    return (
        <>
            <Navbar />

            <div
                style={{
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h1>Welcome to TypingPro</h1>

                <Timer />

                <br />

                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        fontSize: "22px",
                        lineHeight: "1.8",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        minHeight: "120px"
                    }}
                >
                    {paragraph}
                </div>

                <br />

                <TypingBox />

                <br />
                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px"
                    }}
                >
                    <StatsCard title="WPM" value="0" />
                    <StatsCard title="Accuracy" value="100%" />
                    <StatsCard title="Time" value="60" />
                </div>
            </div>
        </>
    );
}