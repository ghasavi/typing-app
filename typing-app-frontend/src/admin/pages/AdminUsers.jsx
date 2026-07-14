import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
    getUsers,
    deleteUser,
    toggleUserStatus
} from "../services/adminService";
import { toast } from "react-toastify";
import {
    FaSearch,
    FaUser,
    FaUserCog,
    FaTrash,
    FaBan,
    FaCheckCircle,
    FaUserShield,
    FaCalendarAlt,
    FaKeyboard
} from "react-icons/fa";
import "../../styles/admin.css";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const currentUsername = localStorage.getItem("username");

    async function loadUsers() {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users.");
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function handleDelete(id, username) {
        if (!window.confirm(`Delete user "${username}"? This action cannot be undone.`)) return;

        setIsLoading(true);
        try {
            await deleteUser(id);
            toast.success(`User "${username}" deleted successfully.`);
            loadUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to delete user."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleToggle(id, active, username) {
        const action = active ? "block" : "unblock";
        if (!window.confirm(`Are you sure you want to ${action} "${username}"?`)) return;

        setIsLoading(true);
        try {
            await toggleUserStatus(id);
            toast.success(
                active
                    ? `User "${username}" blocked successfully.`
                    : `User "${username}" unblocked successfully.`
            );
            loadUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update user."
            );
        } finally {
            setIsLoading(false);
        }
    }

    const filteredUsers = users.filter(user =>
        user.username
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const getRoleBadge = (role) => {
        if (role === "ADMIN") {
            return (
                <span className="badge badge-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <FaUserShield />
                    ADMIN
                </span>
            );
        }
        return (
            <span className="badge" style={{
                background: "#e8dce8",
                color: "#6a5a7a",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
            }}>
                <FaUser />
                USER
            </span>
        );
    };

    const getStatusBadge = (active) => {
        if (active) {
            return (
                <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <FaCheckCircle />
                    Active
                </span>
            );
        }
        return (
            <span className="badge badge-danger" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <FaBan />
                Blocked
            </span>
        );
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1 className="admin-title">
                    User Management
                </h1>
                <div className="admin-header-actions">
                    <span className="admin-last-updated">
                        <FaUser />
                        {users.length} users
                    </span>
                </div>
            </div>

            <div className="admin-search-wrapper">
                <div className="admin-search-container">
                    <FaSearch className="admin-search-icon" />
                    <input
                        type="text"
                        placeholder="Search users by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-search-input"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="admin-search-clear"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>
                            <FaKeyboard style={{ marginRight: "6px" }} />
                            Tests
                        </th>
                        <th>
                            <FaCalendarAlt style={{ marginRight: "6px" }} />
                            Joined
                        </th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="6">
                                <div className="admin-empty">
                                    <div className="admin-empty-icon">👤</div>
                                    <h3>No Users Found</h3>
                                    <p>
                                        {search
                                            ? `No users match "${search}"`
                                            : "No users registered yet"}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="admin-user-info">
                                        <div className="admin-user-avatar">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="admin-username">
                                                {user.username}
                                            </span>
                                        {user.username === currentUsername && (
                                            <span className="admin-current-user-badge">
                                                    You
                                                </span>
                                        )}
                                    </div>
                                </td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.active)}</td>
                                <td>
                                        <span className="admin-test-count">
                                            {user.testsCompleted || 0}
                                        </span>
                                </td>
                                <td className="admin-join-date">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>
                                    {user.username !== currentUsername ? (
                                        <div className="admin-action-buttons">
                                            <button
                                                onClick={() =>
                                                    handleToggle(
                                                        user.id,
                                                        user.active,
                                                        user.username
                                                    )
                                                }
                                                className={user.active ? "admin-btn-block" : "admin-btn-unblock"}
                                                disabled={isLoading}
                                            >
                                                {user.active ? (
                                                    <>
                                                        <FaBan />
                                                        Block
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheckCircle />
                                                        Unblock
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.username
                                                    )
                                                }
                                                className="admin-btn-delete"
                                                disabled={isLoading}
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="admin-current-user-label">
                                                <FaUserCog />
                                                Current User
                                            </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}