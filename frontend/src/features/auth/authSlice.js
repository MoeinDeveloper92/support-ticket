import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


//Below we list out our actions
//Register user
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        //here we get message from the backend
        //if it is a message this part is called
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Login user
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        //by this return we put the error message in the payload
        return thunkAPI.rejectWithValue(message)
    }
})


//logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //here is about only UI state mangement
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    //thos actions we can catch down here
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                //this message comes from rejectWithValue
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer