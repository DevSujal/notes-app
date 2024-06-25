import React, { useEffect, useState } from "react";
import database from "../app write services/database.service";
import Note from "./Note";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Notes({ className, setSearch, search }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const notes = useSelector(state => state.noteReducer.notes)

  return (
    <div className={`w-6/12 min-w-80 flex flex-col gap-3 ${className}`}>
      {notes.filter((note) => (
        note.title.includes(search) || note.content.includes(search)
      )).map((note) => (

          <Note key={note.$id} $id={note.$id} content={note.content} title={note.title} />
      ))}
    </div>
  );
}

export default Notes;
