import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/login");

    }

    return (

        <div
            style={{

                width: "250px",

                background: "#1f2937",

                color: "white",

                minHeight: "100vh",

                display: "flex",

                flexDirection: "column",

                padding: "30px 20px"

            }}
        >

            <h2
                style={{
                    marginBottom: "40px"
                }}
            >
                ⌨ TypingPro Admin
            </h2>

            <Link
                to="/admin/dashboard"
                style={linkStyle}
            >
                📊 Dashboard
            </Link>

            <Link
                to="/admin/users"
                style={linkStyle}
            >
                👥 Users
            </Link>

            <Link
                to="/admin/paragraphs"
                style={linkStyle}
            >
                📝 Paragraphs
            </Link>

            <div style={{ flex: 1 }} />

            <button

                onClick={logout}

                style={{

                    background: "#ef4444",

                    color: "white",

                    border: "none",

                    borderRadius: "8px",

                    padding: "12px",

                    cursor: "pointer"

                }}

            >

                Logout

            </button>

        </div>

    );

}

const linkStyle = {

    color: "white",

    textDecoration: "none",

    marginBottom: "18px",

    fontSize: "18px"

};