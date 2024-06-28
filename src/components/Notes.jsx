import React from "react";
import Note from "./Note";
import { useSelector } from "react-redux";
import { Loader } from "./index";
function Notes({ className, search }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const notes = useSelector((state) => state.noteReducer.notes);

  if (notes.length > 0) {
    return (
      <div className={`w-6/12 min-w-80 flex flex-col gap-3 ${className}`}>
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            
            <Note
              key={note.$id}
              $id={note.$id}
              content={note.content}
              title={note.title}
              date = {note.date}
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
