import React, { useEffect, useId, useState } from "react";
import Button from "./Button";
import database from "../app write services/database.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNote } from "../Store/features/notesSlice";

function NoteEditor() {
  const { url } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.authReducer.userData);
  const notes = useSelector(state => state.noteReducer.notes)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (url) {
      const note = notes.filter((note) => (
        note.$id === url
      ))
      console.log(note);
      setTitle(note[0].title)
      setContent(note[0].content)
    }
  }, []);
  const appendNote = () => {
    if (title !== "" && content !== "") {
      database
        .createNote({ title, content, ...userData })
        .then((data) => {
          if (data) {
            console.log("Note created successfully");
            database.getAllNotes(userData).then((data) => {
              dispatch(addNote(data.documents));
              navigate("/");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const updateNote = () => {
    if (title !== "" && content !== "") {
      database
        .updataNote({ title, content, ...userData, url })
        .then((data) => {
          if (data) {
            console.log("Note created successfully");
            database.getAllNotes(userData).then((data) => {
              dispatch(addNote(data.documents));
              navigate("/");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="w-full h-full">
      <textarea
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the Title here..."
        className="w-full text-white py-4 px-2 h-14 bg-gray-900"
        id="title"
      />
      <textarea
        name="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Enter your notes here..."
        style={{ height: "calc(100% - 68px)" }}
        className="w-full text-white py-4 px-2  bg-gray-900"
        id="content"
      />

      <Button
        onClick={url ? updateNote : appendNote}
        className="absolute bottom-10 right-10 rounded-md py-2 px-4 font-bold"
      >
        Save
      </Button>
    </div>
  );
}

export default NoteEditor;
