import React, { useEffect, useState } from "react";
import {Button} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { appendNote as append, updateNote as update } from "../Store/features/notesSlice";

function NoteEditor() {
  const { url } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.authReducer.userData);
  const notes = useSelector((state) => state.noteReducer.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (url) {
      const note = notes.filter((note) => note.$id === url);
      setTitle(note[0].title);
      setContent(note[0].content);
    }
  }, []);

  const appendNote = () => {
    if (title !== "" && content !== "") {
      dispatch(append({title, content, ...userData}))
      navigate("/")
    }
  };
  const updateNote = () => {
    if (title !== "" && content !== "") {
      dispatch(update({title, content, url, ...userData}))
      navigate("/")
    }
  };
return (
  <div className="w-full h-screen flex flex-col flex-shrink bg-white">
    <textarea
      name="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter the Title here..."
      className="w-full text-xl font-semibold text-white py-4 px-2 bg-black"
      id="title"
    />
    <textarea
      name="content"
      onChange={(e) => setContent(e.target.value)}
      value={content}
      placeholder="Enter your notes here..."
      className="w-full h-full text-white py-4 px-2  bg-black"
      id="content"
    />

    <Button
      onClick={url ? updateNote : appendNote}
      className="absolute hover:opacity-85 bottom-10 right-10 rounded-md py-2 px-4 font-bold"
    >
      Save
    </Button>
  </div>
);
}

export default NoteEditor;
