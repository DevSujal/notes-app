import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      $id: nanoid(),
      title: "start your note journey",
      content: "",
    },
  ],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.data.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.data = state.data.filter((note) => note.$id !== action.payload.$id);
    },
    clearNotes: (state, action) => {
      state.data = [
        {
          $id: nanoid(),
          title: "start your note journey",
          content: "",
        },
      ];
    },
    updateNote: (state, action) => {
      state.data = state.data.map((note) =>
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
