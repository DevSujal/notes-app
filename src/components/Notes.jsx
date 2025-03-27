import React, { useState } from "react";
import { Note } from "../components";
import { useSelector } from "react-redux";
import image from "../assets/image.png";
import {
  Notebook,
  Search,
  Plus,
  Grid,
  List,
  Filter,
  SortAsc,
  Menu,
  X,
  Settings,
  User,
} from "lucide-react";
function Notes({ className }) {
  const notes = useSelector((state) => state.noteReducer.notes);
  const search = useSelector((state) => state.searchReducer.searchText);
  const [viewMode, setViewMode] = useState("grid");
  function generateRandomHexColor() {
    let hexColor = "#";
    const hexCharacters = "0123456789ABCDEF";

    for (let i = 0; i < 6; i++) {
      hexColor += hexCharacters[Math.floor(Math.random() * 16)];
    }

    return hexColor;
  }
  return notes.length > 0 ? (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <SortAsc className="h-5 w-5" />
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Notes Grid/List */}
        <div
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
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
      </main>

      {/* Mobile New Note Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-400 transition duration-200">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full base-color flex flex-col justify-center items-center">
      <img className="max-w-96" src={image} />
      <p>
        {" "}
        <strong> create your first note! </strong>
      </p>
    </div>
  );
}

export default Notes;
