import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

                const bestWpm = Math.max(
                    ...results.map(r => r.wpm)
                );

                const averageWpm =
                    results.reduce((sum, r) => sum + r.wpm, 0)
                    / results.length;

                const averageAccuracy =
                    results.reduce((sum, r) => sum + r.accuracy, 0)
                    / results.length;

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

    return (

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "700px",
                    margin: "40px auto",
                    textAlign: "center"
                }}
            >

                <h1>📊 My Statistics</h1>

                <br />

                <h2>
                    👤 {stats.username}
                </h2>

                <br />

                <h3>
                    🏆 Best WPM: {stats.bestWpm}
                </h3>

                <h3>
                    📈 Average WPM: {stats.averageWpm}
                </h3>

                <h3>
                    🎯 Average Accuracy: {stats.averageAccuracy}%
                </h3>

                <h3>
                    ⌨️ Tests Completed: {stats.testsCompleted}
                </h3>

            </div>

        </>

    );

}