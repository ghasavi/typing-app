import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecentTests from "../components/RecentTests";
import "../styles/dashboard.css";
import DashboardChart from "../components/DashboardChart";
import {
    getDashboard,
    getDashboardHistory
} from "../services/dashboardService";
import {
    FaKeyboard,
    FaTrophy,
    FaChartLine,
    FaBullseye,
    FaSpinner
} from "react-icons/fa";

export default function Dashboard() {
    const [recentTests, setRecentTests] = useState([]);
    const [dashboard, setDashboard] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const summary = await getDashboard();
                const results = await getDashboardHistory();

                setDashboard(summary);

                const chartData = results
                    .reverse()
                    .map((result, index) => ({
                        test: index + 1,
                        wpm: result.wpm
                    }));

                setHistory(chartData);
                setRecentTests(results);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        load();
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="dashboard-loading">
                    <FaSpinner className="dashboard-loading-spinner" />
                    <h2>Loading Dashboard...</h2>
                    <p>Please wait while we fetch your data</p>
                </div>
            </>
        );
    }

    if (!dashboard) {
        return (
            <>
                <Navbar />
                <div className="dashboard-empty">
                    <div className="dashboard-empty-icon">📊</div>
                    <h2>No Data Available</h2>
                    <p>Complete a typing test to see your dashboard</p>
                </div>
            </>
        );
    }

    const summaryCards = [
        {
            title: "Tests Completed",
            value: dashboard.testsCompleted,
            icon: <FaKeyboard />,
            color: "purple"
        },
        {
            title: "Best WPM",
            value: dashboard.bestWpm,
            icon: <FaTrophy />,
            color: "yellow"
        },
        {
            title: "Average WPM",
            value: dashboard.averageWpm,
            icon: <FaChartLine />,
            color: "teal"
        },
        {
            title: "Average Accuracy",
            value: `${dashboard.averageAccuracy}%`,
            icon: <FaBullseye />,
            color: "green"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Track your typing progress and statistics
                    </p>
                </div>

                <div className="summary-grid">
                    {summaryCards.map((card, index) => (
                        <div key={index} className={`summary-card ${card.color}`}>
                            <div className="summary-card-icon">
                                {card.icon}
                            </div>
                            <div className="summary-title">
                                {card.title}
                            </div>
                            <div className="summary-value">
                                {card.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-section">
                    <DashboardChart
                        data={history}
                        title="WPM Progress"
                    />
                </div>

                <RecentTests results={recentTests} />
            </div>
        </>
    );
}