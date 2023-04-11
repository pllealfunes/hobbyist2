import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import { useEffect } from "react";
import { store } from '../store/store'
import { useDispatch } from 'react-redux'
//import { refresh } from '../features/auth/authSlice'
//import useAuth from '../hooks/useAuth';
import RefreshToken from '../hooks/useRefreshToken';
import { refresh } from '../features/auth/authSlice';
const refreshToken = RefreshToken

const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`
});




export default axiosPrivate