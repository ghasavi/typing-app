import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboard } from "../services/adminService";
import "../../styles/admin.css";
import { toast } from "react-toastify";

export default function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setDashboard(data);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadDashboard();

    }, []);

    if (!dashboard) {

        return (

            <AdminLayout>

                <h2>Loading Dashboard...</h2>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h1 className="admin-title">

                📊 Dashboard

            </h1>

            <div className="admin-grid">

                <DashboardCard
                    icon="👥"
                    title="Total Users"
                    value={dashboard.totalUsers}
                />

                <DashboardCard
                    icon="⌨"
                    title="Total Tests"
                    value={dashboard.totalTests}
                />

                <DashboardCard
                    icon="📝"
                    title="Paragraphs"
                    value={dashboard.totalParagraphs}
                />

                <DashboardCard
                    icon="⚡"
                    title="Average WPM"
                    value={dashboard.averageWpm}
                />

            </div>

        </AdminLayout>

    );

}

function DashboardCard({ icon, title, value }) {

    return (

        <div className="admin-card">

            <div className="admin-card-title">

                {icon} {title}

            </div>

            <div className="admin-card-value">

                {value}

            </div>

        </div>

    );

}