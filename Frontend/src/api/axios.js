import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:8000/api/auth'
})

const userApi = axios.create({
    baseURL: `http://localhost:8000/api/user/`
})

const attendanceApi = axios.create({
    baseURL: `http://localhost:8000/api/attendance`
})

const attachToken = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

authApi.interceptors.request.use(attachToken);
userApi.interceptors.request.use(attachToken);
attendanceApi.interceptors.request.use(attachToken);

export { authApi, userApi, attendanceApi };