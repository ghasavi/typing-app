import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    FaChartLine,
    FaHistory,
    FaSignOutAlt,
    FaUser,
    FaHome,
    FaTrophy,
    FaChevronDown,
    FaCrown
} from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef();
    const username = localStorage.getItem("username");

    useEffect(() => {
        function close(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/home" className="logo">
                <span className="logo-icon">⌨️</span>
                <span className="logo-text">MizzyType</span>
            </Link>

            <div className="nav-links">
                <Link to="/home" className="nav-link">
                    <FaHome className="nav-link-icon" />
                    Home
                </Link>
                <Link to="/leaderboard" className="nav-link">
                    <FaTrophy className="nav-link-icon" />
                    Leaderboard
                </Link>
            </div>

            <div ref={menuRef} className="avatar-container">
                <div
                    onClick={() => setOpen(!open)}
                    className={`avatar ${open ? 'active' : ''}`}
                >
                    {username?.charAt(0).toUpperCase() || "U"}
                    <FaChevronDown className={`avatar-arrow ${open ? 'rotated' : ''}`} />
                </div>

                {open && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <div className="dropdown-user-avatar">
                                {username?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="dropdown-user-info">
                                <div className="username-label">Signed in as</div>
                                <strong className="dropdown-username">{username || "User"}</strong>
                            </div>
                        </div>

                        <div className="dropdown-divider" />

                        <MenuItem
                            icon={<FaUser />}
                            text="Public Profile"
                            click={() => {
                                setOpen(false);
                                navigate("/profile");
                            }}
                        />


                        <MenuItem
                            icon={<FaChartLine />}
                            text="Statistics"
                            click={() => {
                                setOpen(false);
                                navigate("/dashboard");
                            }}
                            isHighlight={true}
                        />

                        <MenuItem
                            icon={<FaHistory />}
                            text="History"
                            click={() => {
                                setOpen(false);
                                navigate("/history");
                            }}
                        />

                        <div className="dropdown-divider" />

                        <MenuItem
                            icon={<FaSignOutAlt />}
                            text="Logout"
                            click={() => {
                                setOpen(false);
                                logout();
                            }}
                            isLogout={true}
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}

function MenuItem({ icon, text, click, isLogout, isHighlight }) {
    return (
        <div
            onClick={click}
            className={`menu-item ${isLogout ? 'logout-item' : ''} ${isHighlight ? 'highlight-item' : ''}`}
        >
            <span className="menu-item-icon">{icon}</span>
            <span className="menu-item-text">{text}</span>
            {isHighlight && <span className="menu-item-badge">New</span>}
        </div>
    );
}