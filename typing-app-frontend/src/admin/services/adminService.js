import api from "../../api/axios";

// Dashboard
export async function getDashboard() {

    const response = await api.get("/admin/dashboard");

    return response.data;

}

// Users
export async function getUsers() {

    const response = await api.get("/admin/users");

    return response.data;

}

export async function deleteUser(id) {

    const response = await api.delete(`/admin/users/${id}`);

    return response.data;

}

// Paragraphs
export async function getParagraphs() {

    const response = await api.get("/admin/paragraphs");

    return response.data;

}

export async function addParagraph(paragraph) {

    const response = await api.post(

        "/admin/paragraphs",

        paragraph

    );

    return response.data;

}

export async function updateParagraph(id, paragraph) {

    const response = await api.put(

        `/admin/paragraphs/${id}`,

        paragraph

    );

    return response.data;

}

export async function deleteParagraph(id) {

    const response = await api.delete(

        `/admin/paragraphs/${id}`

    );

    return response.data;

}