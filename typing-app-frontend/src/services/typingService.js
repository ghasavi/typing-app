import api from "../api/axios";

export const getParagraph = async () => {

    const response = await api.get("/typing/paragraph");

    return response.data;

};