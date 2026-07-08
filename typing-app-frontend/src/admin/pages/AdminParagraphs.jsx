import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
    getParagraphs,
    addParagraph,
    updateParagraph,
    deleteParagraph
} from "../services/adminService";
import "../../styles/admin.css";
import { toast } from "react-toastify";

export default function AdminParagraphs() {

    const [paragraphs, setParagraphs] = useState([]);

    const [text, setText] = useState("");

    const [difficulty, setDifficulty] = useState("easy");

    const [editingId, setEditingId] = useState(null);

    async function loadParagraphs() {

        try {

            const data = await getParagraphs();

            setParagraphs(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadParagraphs();

    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        if (text.trim() === "") {

            toast.error("Paragraph cannot be empty.");

            return;

        }

        try {

            if (editingId === null) {

                await addParagraph({

                    text,

                    difficulty

                });

            }

            else {

                await updateParagraph(

                    editingId,

                    {

                        text,

                        difficulty

                    }

                );

            }

            setText("");

            setDifficulty("easy");

            setEditingId(null);

            loadParagraphs();

        }

        catch (error) {

            console.error(error);

        }

    }

    function handleEdit(paragraph) {

        setEditingId(paragraph.id);

        setText(paragraph.text);

        setDifficulty(paragraph.difficulty);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(

            "Delete this paragraph?"

        );

        if (!confirmed) return;

        try {

            await deleteParagraph(id);

            loadParagraphs();

        }

        catch (error) {

            console.error(error);

        }

    }

    function cancelEdit() {

        setEditingId(null);

        setText("");

        setDifficulty("easy");

    }

    return (

        <AdminLayout>

            <h1 className="admin-title">

                Paragraph Manager

            </h1>

            <form

                onSubmit={handleSubmit}

                className="admin-card"

                style={{

                    marginBottom: "35px"

                }}

            >

                <textarea

                    value={text}

                    onChange={(e) =>

                        setText(e.target.value)

                    }

                    rows={6}

                    placeholder="Enter paragraph..."

                    style={{

                        width: "100%",

                        padding: "15px",

                        borderRadius: "10px",

                        marginBottom: "20px",

                        resize: "vertical",

                        fontSize: "16px"

                    }}

                />

                <select

                    value={difficulty}

                    onChange={(e) =>

                        setDifficulty(e.target.value)

                    }

                    style={{

                        padding: "10px",

                        borderRadius: "8px",

                        marginBottom: "20px"

                    }}

                >

                    <option value="easy">

                        Easy

                    </option>

                    <option value="medium">

                        Medium

                    </option>

                    <option value="hard">

                        Hard

                    </option>

                </select>

                <br />

                <button

                    type="submit"

                    style={{

                        background: "#2563eb",

                        color: "white",

                        border: "none",

                        padding: "12px 25px",

                        borderRadius: "8px",

                        cursor: "pointer",

                        marginRight: "15px"

                    }}

                >

                    {

                        editingId === null

                            ? "Add Paragraph"

                            : "Update Paragraph"

                    }

                </button>

                {

                    editingId !== null &&

                    <button

                        type="button"

                        onClick={cancelEdit}

                        style={{

                            background: "#64748b",

                            color: "white",

                            border: "none",

                            padding: "12px 25px",

                            borderRadius: "8px",

                            cursor: "pointer"

                        }}

                    >

                        Cancel

                    </button>

                }

            </form>

            <table className="admin-table">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Difficulty</th>

                    <th>Paragraph</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    paragraphs.map(paragraph => (

                        <tr key={paragraph.id}>

                            <td>

                                {paragraph.id}

                            </td>

                            <td>

                                <span
                                    style={{

                                        background:

                                            paragraph.difficulty === "easy"

                                                ? "#16a34a"

                                                : paragraph.difficulty === "medium"

                                                    ? "#eab308"

                                                    : "#dc2626",

                                        color: "white",

                                        padding: "6px 12px",

                                        borderRadius: "20px"

                                    }}
                                >

                                    {paragraph.difficulty}

                                </span>

                            </td>

                            <td>

                                {

                                    paragraph.text.length > 120

                                        ? paragraph.text.substring(0,120) + "..."

                                        : paragraph.text

                                }

                            </td>

                            <td>

                                <button

                                    onClick={() =>

                                        handleEdit(paragraph)

                                    }

                                    style={{

                                        background: "#2563eb",

                                        color: "white",

                                        border: "none",

                                        padding: "8px 15px",

                                        borderRadius: "6px",

                                        marginRight: "10px",

                                        cursor: "pointer"

                                    }}

                                >

                                    Edit

                                </button>

                                <button

                                    onClick={() =>

                                        handleDelete(paragraph.id)

                                    }

                                    className="admin-delete"

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