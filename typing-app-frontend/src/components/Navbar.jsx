import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div className="logo">

                ⌨ TypingPro

            </div>

            <div className="nav-links">

                <Link
                    to="/home"
                    className="nav-link"
                >
                    Home
                </Link>

                <Link
                    to="/leaderboard"
                    className="nav-link"
                >
                    Leaderboard
                </Link>

                <Link
                    to="/history"
                    className="nav-link"
                >
                    History
                </Link>

                <Link
                    to="/statistics"
                    className="nav-link"
                >
                    Statistics
                </Link>

                <Link
                    to="/profile"
                    className="nav-link"
                >
                    Profile
                </Link>

                <button
                    onClick={logout}
                    className="logout-btn"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}