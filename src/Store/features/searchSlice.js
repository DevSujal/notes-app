import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchToggle: false,
  searchText: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchText = action.payload.searchText;
    },
    toggleSearch: (state, action) => {
      state.searchToggle = !state.searchToggle;
    },
  },
});

export const { toggleSearch, setSearch } = searchSlice.actions;

const searchReducer = searchSlice.reducer;

export default searchReducer;
