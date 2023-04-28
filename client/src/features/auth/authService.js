import axios from 'axios'
import { regularAxios } from '../../config/useAxiosPrivate'
const API_URL = process.env.REACT_APP_URL


// Get User
const getUser = async (id) => {

    const response = await regularAxios.get(`/users/user/${id}`)
    return response.data
}

// Register User
const register = async (userData) => {

    const response = await regularAxios.post(`/auth/signup`, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Login User

const login = async (userData) => {
    const response = await regularAxios.post(`/auth/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Logout User

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUser
}

export default authService