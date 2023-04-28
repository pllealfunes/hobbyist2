import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`,
    headers: {
        Authorization: user ? `Bearer ${user.token}` : null
    }
})

const regularAxios = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
});

export { axiosPrivate, regularAxios }