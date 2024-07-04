import React, { useEffect, useState } from "react";
import { Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  appendNote as append,
  updateNote as update,
} from "../Store/features/notesSlice";
import Swal from "sweetalert2";
import database from "../app write services/database.service";

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

  const appendNote = async () => {
    if (title !== "" && content !== "") {
      const note = await database.createNote({ title, content, ...userData });

      if (!note) {
        console.log("note not created");
        return;
      }
      dispatch(append(note));
      await Swal.fire({
        icon: "success",
        title: "Your note has been created",
        background: "#1a202c",
        color: "#ffffff",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  };
  const updateNote = async () => {
    if (title !== "" && content !== "") {
      const note = await database.updataNote({
        title,
        content,
        url,
        ...userData,
      });
      if (!note) {
        console.log("note not updated");
        return;
      }
      dispatch(update(note));
      await Swal.fire({
        icon: "success",
        title: "Your note has been updated",
        showConfirmButton: false,
        background: "#1a202c",
        color: "#ffffff",
        timer: 1500,
      });
      navigate("/");
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
