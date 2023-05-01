import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;

const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
})

axiosPrivate.interceptors.request.use(
    config => {
        if (user && user.token) { // Check if user and user.token are not null or undefined
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosPrivate