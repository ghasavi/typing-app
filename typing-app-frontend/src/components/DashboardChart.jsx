import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid

} from "recharts";

export default function DashboardChart({ data }) {

    return (

        <div
            style={{

                width:"100%",
                height:"400px",
                background:"#2c2e31",
                borderRadius:"20px",
                padding:"20px"

            }}
        >

            <h2
                style={{
                    marginBottom:"20px"
                }}
            >
                WPM Progress
            </h2>

            <ResponsiveContainer>

                <LineChart data={data}>

                    <CartesianGrid stroke="#444"/>

                    <XAxis

                        dataKey="test"

                        stroke="#d1d0c5"

                    />

                    <YAxis

                        stroke="#d1d0c5"

                    />

                    <Tooltip/>

                    <Line

                        type="monotone"

                        dataKey="wpm"

                        stroke="#e2b714"

                        strokeWidth={4}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}