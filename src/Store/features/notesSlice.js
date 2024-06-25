import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: [
   
  ],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = action.payload
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.$id !== action.payload.$id);
    },
    clearNotes: (state, action) => {
      state.notes = [
        {
          $id: nanoid(),
          title: "start your note journey",
          content: "",
        },
      ];
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.$id === action.payload.$id
          ? {
              ...note,
              title: action.payload.title,
              content: action.payload.content,
            }
          : note
      );
    },
  },
});

export const {addNote, updateNote, deleteNote, clearNotes} = noteSlice.actions

const noteReducer = noteSlice.reducer

export default noteReducer
