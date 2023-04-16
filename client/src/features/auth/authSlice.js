import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const currentUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: currentUser ? currentUser : null,
    isLoading: false,
    message: '',
    currentToken: null,
    singleUser: null
}

// Get User
export const getUser = createAsyncThunk('users/user', async (id, thunkAPI) => {
    try {
        return await authService.getUser(id)
    } catch (error) {
        const message = "Unable to get user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Signup User

export const registerUser = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = "Unable to register user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Login User

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = "Unable to login user"
        return thunkAPI.rejectWithValue(message)
    }
})



// Logout User

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.message = ''
            state.user = null
            state.singleUser = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.singleUser = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.singleUser = null
            })
    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer
export const user = (state) => state.auth.user
export const singleUser = (state) => state.auth.singleUser

