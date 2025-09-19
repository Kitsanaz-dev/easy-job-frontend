import api from "./api";
import { jwtDecode } from "jwt-decode";

export const register = async (userData) => {
    try {
        const res = await api.post('/users', userData);
        return res.data;
    } catch (error) {
        return { error: error.response ? error.response.data : "Network Error" };
    }
}

export const login = async (credentials) => {
    try {
        const res = await api.post("/users/login", credentials);
        localStorage.setItem('token', res.data.token);
        return res.data;
    } catch (error) {
        return { error: error.response ? error.response.data : "Network Error" };
    }
}

export const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        const res = await api.get(`/users/${decoded.userID}`);
        return res.data;
    } catch (error) {
        return { error: error.response ? error.response.data : "Network Error" };
    }
}

export const logOut = (navigate) => {
    try {
        localStorage.removeItem('token');
        if (typeof navigate === 'function') {
            navigate('/');
        } else {
            window.location.href = '/';
        }
    } catch (error) {
            window.location.href = '/';
            return { error: error.response ? error.response.data : "Network Error" };
    }
}