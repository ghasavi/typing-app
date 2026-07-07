import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {

    return (

        <div
            style={{

                display: "flex",

                background: "#111827",

                color: "white",

                minHeight: "100vh"

            }}
        >

            <AdminSidebar />

            <div

                style={{

                    flex: 1,

                    padding: "40px"

                }}

            >

                {children}

            </div>

        </div>

    );

}