import axios from 'axios';
const BASE_URL = process.env.REACT_APP_URL;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
