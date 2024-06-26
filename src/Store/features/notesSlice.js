import { createSlice, nanoid } from "@reduxjs/toolkit";
import database from "../../app write services/database.service";

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
      console.log(action.payload.$id);
      state.notes = state.notes.filter(
        (note) => note.$id !== action.payload.$id
      );
      database.deleteNote(action.payload.$id).then((data) => {
        if (data) {
          console.log(action.payload.$id, "note deleted");
        }
      });
    },
    clearNotes: (state, action) => {
      state.notes = [];
    },
    appendNote: (state, action) => {
      const { title, content, $id } = action.payload;
      const url = database.createUrlFromTitle(title);
      state.notes.push({
        title,
        content,
        $id: url,
      });
      database
        .createNote({ title, content, $id })
        .then((data) => {
          if (data) {
            console.log("Note created successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.$id === action.payload.url
          ? {
              ...note,
              title: action.payload.title,
              content: action.payload.content,
            }
          : note
      );
      database
        .updataNote(action.payload)
        .then((data) => {
          if (data) {
            console.log("Note updated successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const { addNote, updateNote, deleteNote, clearNotes, appendNote } =
  noteSlice.actions;

const noteReducer = noteSlice.reducer;

export default noteReducer;
