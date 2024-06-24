import React, { useEffect, useState } from "react";
import database from "../app write services/database.service";
import Note from "./Note";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Notes({ className, setSearch, search }) {
  const [notes, setNotes] = useState([]);
  const userData = useSelector((state) => state.authReducer.userData);
  useEffect(() => {
    database.getAllNotes(userData).then((allNotes) => {
      setNotes(allNotes.documents);
    });
  }, []);
  return (
    <div className={`w-6/12 min-w-96 flex flex-col gap-3 ${className}`}>
      {notes.filter((note) => (
        note.title.includes(search) || note.content.includes(search)
      )).map((note) => (
        <Link key={note.$id} className="w-full" to={`/edit-note/${note.$id}`}>
          <Note content={note.content} title={note.title} />
        </Link>
      ))}
    </div>
  );
}

export default Notes;
