import api from "../api/axios";

export const register = async (username, email, password) => {

    const response = await api.post("/auth/register", {

        username,
        email,
        password

    });

    return response.data;

};

export const login = async (username, password) => {

    const response = await api.post("/auth/login", {

        username,
        password

    });

    return response.data;

};

export const changePassword = async (

    currentPassword,
    newPassword

) => {

    const response = await api.post("/auth/change-password", {

        currentPassword,
        newPassword

    });

    return response.data;

};

export const forgotPassword = async (email) => {

    const response = await api.post("/auth/forgot-password", {

        email

    });

    return response.data;

};

export const resetPassword = async (

    email,
    otp,
    newPassword

) => {

    const response = await api.post("/auth/reset-password", {

        email,
        otp,
        newPassword

    });

    return response.data;

};