import axious from 'axios';

const api = axious.create({
    baseURL : 'http://localhost:3000/api',
});

// Attach token automatically to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;