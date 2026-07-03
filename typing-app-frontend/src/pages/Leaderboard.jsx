import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "40px auto"
                }}
            >

                <h1>Leaderboard</h1>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                    <tr>

                        <th>Rank</th>
                        <th>User</th>
                        <th>WPM</th>
                        <th>Accuracy</th>

                    </tr>

                    </thead>

                    <tbody>

                    {leaders.map((user, index) => (

                        <tr key={user.id}>

                            <td>{index + 1}</td>

                            <td>{user.user.username}</td>

                            <td>{user.wpm}</td>

                            <td>{user.accuracy}%</td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}