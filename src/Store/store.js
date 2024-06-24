import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import noteReducer from "./features/notesSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        noteReducer
    }
})