import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
    getUsers,
    deleteUser,
    toggleUserStatus
} from "../services/adminService";
import { toast } from "react-toastify";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

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

        if (!window.confirm(`Delete ${username}?`)) return;

        try {

            await deleteUser(id);

            toast.success("User deleted successfully.");

            loadUsers();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to delete user."

            );

        }

    }

    async function handleToggle(id, active) {

        try {

            await toggleUserStatus(id);

            toast.success(

                active

                    ? "User blocked successfully."

                    : "User unblocked successfully."

            );

            loadUsers();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to update user."

            );

        }

    }

    const filteredUsers = users.filter(user =>

        user.username

            .toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <h1 style={{ marginBottom: "25px" }}>
                User Management
            </h1>

            <input

                type="text"

                placeholder="Search users..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                style={{

                    width: "300px",

                    padding: "12px",

                    borderRadius: "8px",

                    border: "none",

                    marginBottom: "30px"

                }}

            />

            <table

                style={{

                    width: "100%",

                    borderCollapse: "collapse",

                    background: "#1f2937",

                    color: "white",

                    borderRadius: "10px",

                    overflow: "hidden"

                }}

            >

                <thead>

                <tr style={{ background: "#111827" }}>

                    <th style={{ padding: "15px" }}>Username</th>

                    <th>Role</th>

                    <th>Status</th>

                    <th>Tests</th>

                    <th>Joined</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredUsers.map(user => (

                        <tr

                            key={user.id}

                            style={{

                                textAlign: "center",

                                borderTop: "1px solid #374151"

                            }}

                        >

                            <td style={{ padding: "15px" }}>

                                {user.username}

                            </td>

                            <td>

                                {

                                    user.role === "ADMIN"

                                        ? "👑 ADMIN"

                                        : "👤 USER"

                                }

                            </td>

                            <td>

                                <span

                                    style={{

                                        color: user.active

                                            ? "#22c55e"

                                            : "#ef4444",

                                        fontWeight: "bold"

                                    }}

                                >

                                    {

                                        user.active

                                            ? "🟢 Active"

                                            : "🔴 Blocked"

                                    }

                                </span>

                            </td>

                            <td>

                                {user.testsCompleted}

                            </td>

                            <td>

                                {user.createdAt}

                            </td>

                            <td>

                                {

                                    user.username !== currentUsername && (

                                        <>

                                            <button

                                                onClick={() =>

                                                    handleToggle(

                                                        user.id,

                                                        user.active

                                                    )

                                                }

                                                style={{

                                                    background: user.active

                                                        ? "#f59e0b"

                                                        : "#22c55e",

                                                    color: "white",

                                                    border: "none",

                                                    padding: "8px 14px",

                                                    borderRadius: "6px",

                                                    cursor: "pointer",

                                                    marginRight: "10px"

                                                }}

                                            >

                                                {

                                                    user.active

                                                        ? "Block"

                                                        : "Unblock"

                                                }

                                            </button>

                                            <button

                                                onClick={() =>

                                                    handleDelete(

                                                        user.id,

                                                        user.username

                                                    )

                                                }

                                                style={{

                                                    background: "#ef4444",

                                                    color: "white",

                                                    border: "none",

                                                    padding: "8px 14px",

                                                    borderRadius: "6px",

                                                    cursor: "pointer"

                                                }}

                                            >

                                                Delete

                                            </button>

                                        </>

                                    )

                                }

                                {

                                    user.username === currentUsername && (

                                        <span

                                            style={{

                                                color: "#9ca3af",

                                                fontStyle: "italic"

                                            }}

                                        >

                                            Current User

                                        </span>

                                    )

                                }

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </AdminLayout>

    );

}