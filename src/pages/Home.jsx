import React, { useEffect, useState } from "react";
import { AddNotes, Loader, Notes, Search } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { login } from "../Store/features/authSlice";
import { addNote } from "../Store/features/notesSlice";

function Home() {
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
  const data = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!status) {
      if (data?.user) dispatch(login(data.user));

      if (data?.notes) dispatch(addNote(data.notes));
    }
  });

  if (status) {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3 items-center">
        <Search setSearch={setSearch} searchContent={search} />
        <Notes search={search} />
        <AddNotes />
      </div>
    );
  } else {
    return <h1 className="text-white m-auto text-xl font-bold">Please Login to Make Notes..</h1>;
  }
}

export default Home;
