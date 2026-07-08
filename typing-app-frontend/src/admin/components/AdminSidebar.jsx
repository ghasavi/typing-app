import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

export default function AdminSidebar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/login");

    }

    return (

        <div className="admin-sidebar">

            <h2>

                ⌨ TypingPro

            </h2>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "40px"
                }}
            >
                Admin Panel
            </p>

            <Link to="/admin/dashboard" className="admin-link">

                📊 Dashboard

            </Link>

            <Link to="/admin/users" className="admin-link">

                👥 Users

            </Link>

            <Link to="/admin/paragraphs" className="admin-link">

                📝 Paragraphs

            </Link>

            <div style={{ flex: 1 }} />

            <button

                className="admin-logout"

                onClick={logout}

            >

                Logout

            </button>

        </div>

    );

}