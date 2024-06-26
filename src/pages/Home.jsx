import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Notes from "../components/Notes";
import AddNotes from "../components/AddNotes";
import { useDispatch, useSelector } from "react-redux";
import auth from "../app write services/auth.service";
import { login, logout } from "../Store/features/authSlice";
import { addNote } from "../Store/features/notesSlice";
import database from "../app write services/database.service";

function Home() {
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(!status){
      auth.getCurrentUser()
      .then((user) => {
        dispatch(login(user))
        database.getAllNotes(user)
        .then((data) => {
          dispatch(addNote(data.documents))
        }).catch((err) => {
          dispatch(logout())
        })
      }).catch((err) => {
        dispatch(logout())
      })
    }
  }, [status])
  const dispatch = useDispatch();
  if (status) {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3 items-center">
        <Search setSearch={setSearch} searchContent={search} />
        <Notes search={search} />
        <AddNotes />
      </div>
    );
  } else {
   return <div className="absolute font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h1 className="text-white text-2xl text-center font-bold">Please Login To Use Our Services...</h1>
    </div>;
  }
}

export default Home;
