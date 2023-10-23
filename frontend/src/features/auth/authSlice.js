import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {

    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer