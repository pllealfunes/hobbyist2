import axios from 'axios'
const API_URL = process.env.REACT_APP_URL


// Get User
const getUser = async (id) => {

    const response = await axios.get(`http://192.241.129.133/api/users/user/${id}`)
    return response.data
}

// Register User
const register = async (userData) => {

    const response = await axios.post(`${API_URL}/api/auth/signup`, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Login User

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData)

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