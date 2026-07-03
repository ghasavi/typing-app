import api from "../api/axios";

export async function getDashboard() {

    const response = await api.get("/results/dashboard");

    return response.data;

}

export async function getDashboardHistory() {

    const response = await api.get("/results/my-results");

    return response.data;

}