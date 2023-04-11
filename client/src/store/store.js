import { configureStore } from '@reduxjs/toolkit'
//import apiReducer from './api/apiSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        //api: apiReducer,
        auth: authReducer
    }
})