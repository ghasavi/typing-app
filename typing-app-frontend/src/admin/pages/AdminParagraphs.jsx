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
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";

export default function AdminParagraphs() {
    const [paragraphs, setParagraphs] = useState([]);
    const [text, setText] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function loadParagraphs() {
        try {
            const data = await getParagraphs();
            setParagraphs(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load paragraphs");
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

        setIsLoading(true);

        try {
            if (editingId === null) {
                await addParagraph({ text, difficulty });
                toast.success("Paragraph added successfully!");
            } else {
                await updateParagraph(editingId, { text, difficulty });
                toast.success("Paragraph updated successfully!");
            }

            setText("");
            setDifficulty("easy");
            setEditingId(null);
            loadParagraphs();
        } catch (error) {
            console.error(error);
            toast.error(editingId === null ? "Failed to add paragraph" : "Failed to update paragraph");
        } finally {
            setIsLoading(false);
        }
    }

    function handleEdit(paragraph) {
        setEditingId(paragraph.id);
        setText(paragraph.text);
        setDifficulty(paragraph.difficulty);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this paragraph?");
        if (!confirmed) return;

        try {
            await deleteParagraph(id);
            toast.success("Paragraph deleted successfully!");
            loadParagraphs();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete paragraph");
        }
    }

    function cancelEdit() {
        setEditingId(null);
        setText("");
        setDifficulty("easy");
    }

    const getDifficultyBadge = (difficulty) => {
        const configs = {
            easy: { class: "badge-success", label: "Easy" },
            medium: { class: "badge-warning", label: "Medium" },
            hard: { class: "badge-danger", label: "Hard" }
        };
        const config = configs[difficulty] || configs.easy;
        return <span className={`badge ${config.class}`}>{config.label}</span>;
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1 className="admin-title">
                    Paragraph Manager
                </h1>
                <div className="admin-header-actions">
                    <span className="admin-last-updated">
                        <FaSave />
                        {paragraphs.length} paragraphs
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                    <label htmlFor="paragraph-text">
                        Paragraph Text
                    </label>
                    <textarea
                        id="paragraph-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={6}
                        placeholder="Enter paragraph text here..."
                        className="admin-textarea"
                    />
                </div>

                <div className="admin-form-row">
                    <div className="admin-form-group admin-form-group-half">
                        <label htmlFor="difficulty-select">
                            Difficulty Level
                        </label>
                        <select
                            id="difficulty-select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="admin-select"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="admin-form-group admin-form-group-half admin-form-actions">
                        <button
                            type="submit"
                            className="admin-btn-submit"
                            disabled={isLoading}
                        >
                            {editingId === null ? (
                                <>
                                    <FaPlus />
                                    {isLoading ? "Adding..." : "Add Paragraph"}
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    {isLoading ? "Updating..." : "Update Paragraph"}
                                </>
                            )}
                        </button>

                        {editingId !== null && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="admin-btn-cancel"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Difficulty</th>
                        <th>Paragraph</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paragraphs.length === 0 ? (
                        <tr>
                            <td colSpan="4">
                                <div className="admin-empty">
                                    <div className="admin-empty-icon">📝</div>
                                    <h3>No Paragraphs Found</h3>
                                    <p>Add your first paragraph using the form above.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        paragraphs.map(paragraph => (
                            <tr key={paragraph.id}>
                                <td>
                                        <span className="admin-id-badge">
                                            #{paragraph.id}
                                        </span>
                                </td>
                                <td>
                                    {getDifficultyBadge(paragraph.difficulty)}
                                </td>
                                <td>
                                    <div className="admin-paragraph-text">
                                        {paragraph.text.length > 120
                                            ? paragraph.text.substring(0, 120) + "..."
                                            : paragraph.text}
                                    </div>
                                </td>
                                <td>
                                    <div className="admin-action-buttons">
                                        <button
                                            onClick={() => handleEdit(paragraph)}
                                            className="admin-edit"
                                        >
                                            <FaEdit />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(paragraph.id)}
                                            className="admin-delete"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
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