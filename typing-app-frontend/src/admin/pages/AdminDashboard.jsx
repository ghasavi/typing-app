import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
    getDashboard,
    getActivity
} from "../services/adminService";
import {
    Line
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";
import {
    FaUsers,
    FaKeyboard,
    FaFileAlt,
    FaBolt,
    FaUserPlus,
    FaChartLine
} from "react-icons/fa";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalTests: 0,
        totalParagraphs: 0,
        averageWpm: 0
    });
    const [activity, setActivity] = useState([]);

    async function loadDashboard() {
        const data = await getDashboard();
        setDashboard(data);
    }

    async function loadActivity() {
        const data = await getActivity();
        setActivity(data);
    }

    useEffect(() => {
        loadDashboard();
        loadActivity();
        const interval = setInterval(() => {
            loadDashboard();
            loadActivity();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: activity.map(a => a.date),
        datasets: [
            {
                label: "Typing Tests",
                data: activity.map(a => a.tests),
                borderColor: "#6b5b8a",
                backgroundColor: "rgba(199, 184, 216, 0.2)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#6b5b8a",
                pointBorderColor: "#f5ecf5",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#6a5a7a",
                    font: {
                        family: "'Roboto Mono', monospace",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: "#f5ecf5",
                titleColor: "#5a4a6a",
                bodyColor: "#6a5a7a",
                borderColor: "#d8ccdc",
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#8a7a9a",
                    font: {
                        family: "'Roboto Mono', monospace",
                        size: 11
                    }
                },
                grid: {
                    color: "rgba(160, 140, 180, 0.1)"
                }
            },
            y: {
                ticks: {
                    color: "#8a7a9a",
                    font: {
                        family: "'Roboto Mono', monospace",
                        size: 11
                    },
                    stepSize: 1
                },
                grid: {
                    color: "rgba(160, 140, 180, 0.1)"
                },
                beginAtZero: true
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    const cardConfigs = [
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            icon: <FaUsers />,
            color: "purple"
        },
        {
            title: "Total Tests",
            value: dashboard.totalTests,
            icon: <FaKeyboard />,
            color: "pink"
        },
        {
            title: "Paragraphs",
            value: dashboard.totalParagraphs,
            icon: <FaFileAlt />,
            color: "green"
        },
        {
            title: "Avg WPM",
            value: dashboard.averageWpm,
            icon: <FaBolt />,
            color: "yellow"
        }
    ];

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1 className="admin-title">
                    Dashboard
                </h1>
                <div className="admin-header-actions">
                    <span className="admin-last-updated">
                        <FaChartLine />
                        Live Updates
                    </span>
                </div>
            </div>

            <div className="admin-grid">
                {cardConfigs.map((card, index) => (
                    <AdminCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                    />
                ))}
            </div>

            <div className="admin-chart-container">
                <div className="admin-chart-header">
                    <h2 className="admin-chart-title">
                        Activity (Last 7 Days)
                    </h2>
                    <div className="admin-chart-badge">
                        <FaUserPlus />
                        {dashboard.totalUsers} active users
                    </div>
                </div>
                <div className="admin-chart-wrapper">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </AdminLayout>
    );
}

function AdminCard({ title, value, icon, color }) {
    return (
        <div className={`admin-card ${color}`}>
            <div className="admin-card-icon">
                {icon}
            </div>
            <div className="admin-card-title">
                {title}
            </div>
            <div className="admin-card-value">
                {value}
            </div>
        </div>
    );
}