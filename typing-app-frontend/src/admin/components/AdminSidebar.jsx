import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaFileAlt,
    FaSignOutAlt,
    FaTachometerAlt
} from "react-icons/fa";
import "../../styles/admin.css";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-title">
                ⌨️ TypingPro
            </div>
            <p className="admin-sidebar-subtitle">
                Admin Panel
            </p>

            <nav className="admin-nav">
                <Link
                    to="/admin/dashboard"
                    className={`admin-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                >
                    <FaTachometerAlt />
                    Dashboard
                </Link>

                <Link
                    to="/admin/users"
                    className={`admin-link ${isActive('/admin/users') ? 'active' : ''}`}
                >
                    <FaUsers />
                    Users
                </Link>

                <Link
                    to="/admin/paragraphs"
                    className={`admin-link ${isActive('/admin/paragraphs') ? 'active' : ''}`}
                >
                    <FaFileAlt />
                    Paragraphs
                </Link>
            </nav>

            <div style={{ flex: 1 }} />

            <button
                className="admin-logout"
                onClick={logout}
            >
                <FaSignOutAlt />
                Logout
            </button>
        </div>
    );
}