import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import noteReducer from "./features/notesSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        noteReducer,
        searchReducer
    }
})