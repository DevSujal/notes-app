import React, { useCallback, } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "../Store/features/notesSlice";
import Swal from "sweetalert2";
import database from "../app write services/database.service";
import { useLongPress } from "use-long-press";
import images from "../helper/images.js";
function Note({ $id, title, content, className, date, bgColor }) {
  const dispatch = useDispatch();
  const callback = useCallback(() => {
    remove();
  }, []);

  const bind = useLongPress(callback, {
    filterEvents: () => true,
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: 25,
    cancelOutsideElement: true,
    detect: "pointer",
  });
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
      {...bind()}
      style={{
        background: `${bgColor}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        width: "100%",
        height : "auto"
      }}
      className={`w-full flex justify-between items-center cursor-pointer text-white rounded p-2 bg-black/90 ${className}`}
    >
      <Link className="w-full" to={`/edit-note/${$id}`}>
        <div className="flex flex-col gap-1">
          <h2 className="sm:text-4xl text-xl whitespace-nowrap overflow-hidden text-ellipsis font-bold">
            {title}
          </h2>
          <h5 className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-lg ">
            {content}
          </h5>
          <h5 className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-lg">
            {date ? date : Date(Date.now()).substring(4, 24)}
          </h5>
        </div>
      </Link>
    </div>
  );
}

export default Note;
