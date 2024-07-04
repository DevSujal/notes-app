import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "../Store/features/notesSlice";
import removeImg from "../assets/delete.webp";
import Swal from "sweetalert2";
import database from "../app write services/database.service";

function Note({ $id, title, content, className, date }) {
  const dispatch = useDispatch();
  const remove = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#1a202c",
      color: "#ffffff",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      await database.deleteNote($id);
      dispatch(deleteNote($id));
      await Swal.fire({
        title: "Deleted!",
        text: "Your note has been deleted.",
        icon: "success",
        background: "#1a202c",
        color: "#ffffff",
      });
    }
  };
  return (
    <div
      className={`w-full flex justify-between items-center cursor-pointer text-white rounded p-2 bg-black/90 ${className}`}
    >
      <Link className="w-9/12" to={`/edit-note/${$id}`}>
        <div className="flex flex-col flex-shrink flex-grow gap-1">
          <h2 className="text-lg whitespace-nowrap overflow-hidden text-ellipsis font-bold">
            {title}
          </h2>
          <h5 className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs text-slate-400">
            {content}
          </h5>
          <h5 className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs text-slate-400">
            last updated : {date ? date : Date(Date.now()).substring(4, 24)}
          </h5>
        </div>
      </Link>
      <span onClick={remove} className=" z-10">
        <img src={removeImg} width={70} alt="remove" />
      </span>
    </div>
  );
}

export default Note;
