import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getUsers, deleteUser } from "../services/adminService";
import { toast } from "react-toastify";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    async function loadUsers() {

        try {

            const data = await getUsers();

            setUsers(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);

    async function handleDelete(id, username) {

        const confirmed = window.confirm(

            `Delete ${username}?`

        );

        if (!confirmed) return;

        try {

            await deleteUser(id);

            loadUsers();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to delete user."

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

            <h1
                style={{

                    marginBottom: "25px"

                }}
            >

                Users

            </h1>

            <input

                type="text"

                placeholder="Search users..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

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

                    background: "#1f2937"

                }}

            >

                <thead>

                <tr>

                    <th>Username</th>

                    <th>Role</th>

                    <th>Tests</th>

                    <th>Joined</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredUsers.map(user => (

                        <tr key={user.id}>

                            <td>{user.username}</td>

                            <td>

                                {

                                    user.role === "ADMIN"

                                        ?

                                        "👑 ADMIN"

                                        :

                                        "USER"

                                }

                            </td>

                            <td>

                                {user.testsCompleted}

                            </td>

                            <td>

                                {user.createdAt}

                            </td>

                            <td>

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

                                        padding: "8px 15px",

                                        borderRadius: "6px",

                                        cursor: "pointer"

                                    }}

                                >

                                    Delete

                                </button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </AdminLayout>

    );

}