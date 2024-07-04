import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = action.payload;
    },
    deleteNote: (state, action) => {
      const $id = action.payload;
      state.notes = state.notes.filter((item) => item.$id !== $id);
    },
    clearNotes: (state, action) => {
      state.notes = [];
    },
    appendNote: (state, action) => {
      const note = action.payload;
      state.notes = [note, ...state.notes]
    },

    updateNote: (state, action) => {
      const note = action.payload;

      state.notes = state.notes.map((item) => {
        if (item.$id === note.$id) {
          return note;
        }
        return item;
      });
    },
  },
});

export const { addNote, updateNote, deleteNote, clearNotes, appendNote } =
  noteSlice.actions;

const noteReducer = noteSlice.reducer;

export default noteReducer;
