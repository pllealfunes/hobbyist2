import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
})

axiosPrivate.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${user.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosPrivate