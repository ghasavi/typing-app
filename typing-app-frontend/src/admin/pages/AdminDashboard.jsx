import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {

    return (

        <AdminLayout>

            <h1
                style={{
                    fontSize: "40px"
                }}
            >
                Dashboard
            </h1>

            <p
                style={{
                    color: "#9ca3af"
                }}
            >
                Welcome Administrator.
            </p>

        </AdminLayout>

    );

}