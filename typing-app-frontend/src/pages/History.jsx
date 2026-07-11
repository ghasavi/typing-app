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

    return (

        <UserLayout>

            <div
                style={{
                    maxWidth: "900px",
                    margin: "40px auto"
                }}
            >

                <h1>Typing History</h1>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Time</th>
                        <th>Date</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        results.map(result => (

                            <tr key={result.id}>

                                <td>{result.id}</td>

                                <td>{result.wpm}</td>

                                <td>{result.accuracy}%</td>

                                <td>{result.time}s</td>

                                <td>

                                    {

                                        result.createdAt
                                            ? new Date(result.createdAt).toLocaleString()
                                            : "-"

                                    }

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </UserLayout>

    );

}