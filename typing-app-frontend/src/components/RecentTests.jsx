export default function RecentTests({ results }) {

    return (

        <div
            style={{

                background:"#2c2e31",

                marginTop:"40px",

                borderRadius:"20px",

                padding:"30px"

            }}
        >

            <h2
                style={{
                    marginBottom:"25px"
                }}
            >
                Recent Tests
            </h2>

            <table
                style={{

                    width:"100%",

                    borderCollapse:"collapse"

                }}
            >

                <thead>

                <tr>

                    <th align="left">Date</th>

                    <th align="center">Difficulty</th>

                    <th align="center">WPM</th>

                    <th align="center">Accuracy</th>

                    <th align="center">Time</th>

                </tr>

                </thead>

                <tbody>

                {

                    results.slice(0,5).map((result)=>(

                        <tr
                            key={result.id}
                            style={{

                                borderTop:"1px solid #444",

                                height:"55px"

                            }}
                        >

                            <td>

                                {

                                    new Date(result.createdAt)

                                        .toLocaleDateString()

                                }

                            </td>

                            <td align="center">

                                {

                                    result.difficulty ?? "Easy"

                                }

                            </td>

                            <td
                                align="center"

                                style={{

                                    color:"#e2b714",

                                    fontWeight:"bold"

                                }}

                            >

                                {result.wpm}

                            </td>

                            <td align="center">

                                {result.accuracy}%

                            </td>

                            <td align="center">

                                {result.time}s

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}