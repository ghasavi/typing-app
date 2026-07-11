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

                borderColor: "#3b82f6",

                backgroundColor: "#3b82f633",

                fill: true,

                tension: 0.4

            }

        ]

    };

    return (

        <AdminLayout>

            <h1 style={{ marginBottom: 30 }}>

                Admin Dashboard

            </h1>

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns: "repeat(4,1fr)",

                    gap: 20,

                    marginBottom: 40

                }}

            >

                <Card

                    title="👥 Total Users"

                    value={dashboard.totalUsers}

                />

                <Card

                    title="⌨️ Total Tests"

                    value={dashboard.totalTests}

                />

                <Card

                    title="📄 Paragraphs"

                    value={dashboard.totalParagraphs}

                />

                <Card

                    title="⚡ Avg WPM"

                    value={dashboard.averageWpm}

                />

            </div>

            <div

                style={{

                    background:"#1f2937",

                    padding:25,

                    borderRadius:12

                }}

            >

                <h2

                    style={{

                        marginBottom:20

                    }}

                >

                    Activity (Last 7 Days)

                </h2>

                <Line

                    data={chartData}

                />

            </div>

        </AdminLayout>

    );

}

function Card({

                  title,

                  value

              }) {

    return (

        <div

            style={{

                background:"#1f2937",

                borderRadius:12,

                padding:25,

                textAlign:"center",

                color:"white"

            }}

        >

            <h4>{title}</h4>

            <h1

                style={{

                    marginTop:15,

                    fontSize:40

                }}

            >

                {value}

            </h1>

        </div>

    );

}