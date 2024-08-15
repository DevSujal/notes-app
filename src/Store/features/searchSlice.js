import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchToggle: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleSearch: (state, action) => {
      state.searchToggle = !state.searchToggle;
    },
  },
});

export const { toggleSearch } = searchSlice.actions;

const searchReducer = searchSlice.reducer;

export default searchReducer;
