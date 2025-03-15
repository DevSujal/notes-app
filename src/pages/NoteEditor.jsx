import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  appendNote as append,
  updateNote as update,
} from "../Store/features/notesSlice";
import database from "../app write services/database.service";
import { Button, TextArea } from "../components";
import { generateNote } from "../helper/gemini";
import { Loader2 } from "lucide-react";

function NoteEditor() {
  const { url } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState("");
  const userData = useSelector((state) => state.authReducer.userData);
  const notes = useSelector((state) => state.noteReducer.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (url) {
      const note = notes.filter((note) => note.$id === url);

      if (note.length == 0) {
        navigate("/page-not-found");
      }
      setTitle(note[0].title);
      setContent(note[0].content);
    }
  }, []);
  const appendNote = async (title, content) => {
    try {
      if (title !== "" && content !== "") {
        const note = await database.createNote({ title, content, ...userData });

        if (!note) {
          console.log("note not created");
          return;
        }
        console.log("note created");
        dispatch(append(note));
        navigate(`/edit-note/${note.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateNote = async (title, content) => {
    try {
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
        console.log("note updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (title, content) => {
    const note = notes.filter((note) => note.$id === url);

    if (
      note.length > 0 &&
      note[0].title === title &&
      note[0].content === content
    )
      return;

    if (url) {
      await updateNote(title, content);
    } else {
      await appendNote(title, content);
    }
  };

  const generate = async () => {
    try {
      setLoading(true);
      const newContent = await generateNote(content);
      setContent(newContent);
    } catch (error) {
      console.log(error);
      setContent(content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col flex-grow bg-transparent">
      <TextArea
        name="title"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        updateData={updateData}
        placeholder="Enter the Title here..."
        className="w-full text-xl font-semibold text-white py-4 px-2 bg-black/70"
        id="title"
      />
      <div className="h-full w-full relative">
        <Button
          onClick={generate}
          style={{ background: "#0A0A0D" }}
          className="w-fit absolute top-1 right-5 rounded cursor-pointer border p-2 border-solid border-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : "💡 enhance"}
        </Button>
        <TextArea
          name="content"
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          updateData={updateData}
          placeholder="Enter your notes here..."
          className="w-full hide-scrollbar h-full text-white py-4 px-2 flex-grow  bg-black/70"
          id="content"
        />
      </div>
    </div>
  );
}

export default NoteEditor;
