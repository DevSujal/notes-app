import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true,
            state.userData = action.payload
    },
        logout : (state, action) => {
            state.status = false
        }
    }
})

export const {login, logout} = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer