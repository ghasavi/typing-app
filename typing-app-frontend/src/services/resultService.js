import api from "../api/axios";

export async function saveResult(result) {

    const response = await api.post(

        "/results",

        result

    );

    return response.data;

}