import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {deleteNote } from "../Store/features/notesSlice";

function Note({ $id, title, content, className }) {
  const userData = useSelector(state => state.authReducer.userData)
  const dispatch = useDispatch()
  const remove = () => {
    dispatch(deleteNote({$id}))
  };
  return (
    <div
      className={`w-full flex justify-between items-center cursor-pointer text-white rounded p-3 bg-gray-900 ${className}`}
    >
      <Link className="w-10/12" to={`/edit-note/${$id}`}>
        <div>
          <h2 className="text-lg whitespace-nowrap overflow-hidden text-ellipsis font-bold">
            {title}
          </h2>
          <h5 className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs text-gray-400">
            {content}
          </h5>
        </div>
      </Link>
      <span onClick={remove} className="text-3xl z-10">
       ❌
      </span>
    </div>
  );
}

export default Note;
