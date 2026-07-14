import api from "../api/axios";

// Register
export const register = async (username, email, password) => {

    const response = await api.post("/auth/register", {

        username,
        email,
        password

    });

    return response.data;

};

// Login
export const login = async (username, password) => {

    const response = await api.post("/auth/login", {

        username,
        password

    });

    return response.data;

};

// Change Password
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