import React from "react";
import { Note } from "../components";
import { useSelector } from "react-redux";
import image from "../assets/image.png"
function Notes({ className, search }) {
  const notes = useSelector((state) => state.noteReducer.notes);

  function generateRandomHexColor() {
    let hexColor = "#";
    const hexCharacters = "0123456789ABCDEF";

    for (let i = 0; i < 6; i++) {
      hexColor += hexCharacters[Math.floor(Math.random() * 16)];
    }

    return hexColor;
  }
  if (notes.length > 0) {
    return (
      <div
        className={`w-full p-3 bg-transparent rounded max-w-screen-sm flex flex-col gap-3 ${className}`}
      >
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note, idx) => (
            <Note
              key={note.$id}
              bgColor={generateRandomHexColor()}
              $id={note.$id}
              content={note.content}
              title={note.title}
              date={note.date}
              className="hover:opacity-80"
            />
          ))}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full base-color flex flex-col justify-center items-center">
        <img className="max-w-96" src={image} />
        <p>
          {" "}
          <strong> create your first note! </strong>
        </p>
      </div>
    );
  }
}

export default Notes;
