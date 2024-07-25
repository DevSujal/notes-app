import React from "react";
import {Note} from "../components";
import { useSelector } from "react-redux";
function Notes({ className, search }) {
  const notes = useSelector((state) => state.noteReducer.notes);

  if (notes.length > 0) {
    return (
      <div className={`w-full p-3 bg-slate-500/5 rounded max-w-screen-sm flex flex-col gap-3 ${className}`}>
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note, idx) => (
            
            <Note
              key={note.$id}
              idx = {idx % 6}
              $id={note.$id}
              content={note.content}
              title={note.title}
              date = {note.date}
              className="hover:opacity-80"
            />
          ))}
      </div>
    );
  } else {
    return (
        <h1 className="text-white">Make Your First Note...</h1>
    );
  }
}

export default Notes;
