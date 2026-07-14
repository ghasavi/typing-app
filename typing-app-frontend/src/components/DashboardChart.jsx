import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { FaChartLine } from "react-icons/fa";

export default function DashboardChart({ data, title = "WPM Progress" }) {
    // Calculate average WPM
    const avgWpm = data.length > 0
        ? Math.round(data.reduce((sum, d) => sum + d.wpm, 0) / data.length)
        : 0;

    return (
        <div
            style={{
                width: "100%",
                height: "450px",
                background: "linear-gradient(145deg, #f5ecf5, #ede4ed)",
                borderRadius: "20px",
                padding: "25px",
                border: "1px solid #d8ccdc",
                boxShadow: "0 4px 15px rgba(160, 140, 180, 0.1)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Decorative gradient line at top */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #c7b8d8, #b8c8e8, #c7b8d8)",
                    opacity: 0.6
                }}
            />

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "15px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >
                    <FaChartLine
                        style={{
                            fontSize: "24px",
                            color: "#6b5b8a"
                        }}
                    />
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#5a4a6a",
                            margin: 0,
                            letterSpacing: "-0.3px"
                        }}
                    >
                        {title}
                    </h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "12px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 14px",
                            background: "rgba(255, 255, 255, 0.6)",
                            borderRadius: "10px",
                            border: "1px solid #e8e0f0"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "11px",
                                color: "#8a7a9a",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.3px"
                            }}
                        >
                            Tests
                        </span>
                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "700",
                                color: "#5a4a6a"
                            }}
                        >
                            {data.length}
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 14px",
                            background: "rgba(255, 255, 255, 0.6)",
                            borderRadius: "10px",
                            border: "1px solid #e8e0f0"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "11px",
                                color: "#8a7a9a",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.3px"
                            }}
                        >
                            Avg
                        </span>
                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "700",
                                color: "#5a4a6a"
                            }}
                        >
                            {avgWpm} WPM
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {data.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 70px)",
                        color: "#8a7a9a",
                        textAlign: "center"
                    }}
                >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
                    <h3 style={{ color: "#7a6a8a", marginBottom: "8px", fontSize: "18px" }}>
                        No Data Available
                    </h3>
                    <p style={{ color: "#9a8aaa", fontSize: "14px" }}>
                        Complete typing tests to see your progress here
                    </p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={330}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <defs>
                            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6b5b8a" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6b5b8a" stopOpacity={0.02}/>
                            </linearGradient>
                            <linearGradient id="wpmGlow" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#6b5b8a" stopOpacity={0.1}/>
                                <stop offset="50%" stopColor="#c7b8d8" stopOpacity={0.3}/>
                                <stop offset="100%" stopColor="#6b5b8a" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(160, 140, 180, 0.12)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="test"
                            stroke="#8a7a9a"
                            tick={{
                                fill: '#8a7a9a',
                                fontSize: 11,
                                fontWeight: 500
                            }}
                            tickLine={{ stroke: 'rgba(160, 140, 180, 0.2)' }}
                            axisLine={{ stroke: 'rgba(160, 140, 180, 0.2)' }}
                        />
                        <YAxis
                            stroke="#8a7a9a"
                            tick={{
                                fill: '#8a7a9a',
                                fontSize: 11,
                                fontWeight: 500
                            }}
                            tickLine={{ stroke: 'rgba(160, 140, 180, 0.2)' }}
                            axisLine={{ stroke: 'rgba(160, 140, 180, 0.2)' }}
                            domain={[0, 'auto']}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div
                                            style={{
                                                background: "#faf5fa",
                                                border: "1px solid #d8ccdc",
                                                borderRadius: "12px",
                                                padding: "12px 16px",
                                                boxShadow: "0 8px 25px rgba(160, 140, 180, 0.2)",
                                                minWidth: "120px"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: "11px",
                                                    color: "#8a7a9a",
                                                    fontWeight: "600",
                                                    marginBottom: "6px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px"
                                                }}
                                            >
                                                Test #{label}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "700",
                                                    color: "#5a4a6a",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "10px",
                                                        height: "10px",
                                                        borderRadius: "50%",
                                                        background: "#6b5b8a",
                                                        flexShrink: 0
                                                    }}
                                                />
                                                {payload[0].value} WPM
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        {/* Glow line behind main line */}
                        <Line
                            type="monotone"
                            dataKey="wpm"
                            stroke="url(#wpmGlow)"
                            strokeWidth={12}
                            dot={false}
                            fill="none"
                        />
                        {/* Main line */}
                        <Line
                            type="monotone"
                            dataKey="wpm"
                            stroke="#6b5b8a"
                            strokeWidth={3}
                            dot={{
                                fill: '#6b5b8a',
                                stroke: '#f5ecf5',
                                strokeWidth: 2,
                                r: 5,
                                transition: 'all 0.3s ease'
                            }}
                            activeDot={{
                                fill: '#c7b8d8',
                                stroke: '#f5ecf5',
                                strokeWidth: 3,
                                r: 8,
                                transition: 'all 0.3s ease'
                            }}
                            fill="url(#wpmGradient)"
                            fillOpacity={1}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}