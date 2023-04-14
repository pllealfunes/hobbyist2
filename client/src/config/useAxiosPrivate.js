import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const axiosPrivate = user ? axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`,
    headers: {
        Authorization: `Bearer ${user.token}`
    }
}) : axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
})


export default axiosPrivate