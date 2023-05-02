import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
})

axiosPrivate.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'))
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