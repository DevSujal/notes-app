import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Notes from "../components/Notes";
import AddNotes from "../components/AddNotes";
import { useDispatch, useSelector } from "react-redux";
import auth from "../app write services/auth.service";
import { login, logout } from "../Store/features/authSlice";
import { addNote } from "../Store/features/notesSlice";
import database from "../app write services/database.service";
import { Loader } from "../components";

function Home() {
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (!status) {
      auth
        .getCurrentUser()
        .then((user) => {
          dispatch(login(user));
          database
            .getAllNotes(user)
            .then((data) => {
              dispatch(addNote(data.documents));
            })
            .catch((err) => {
              dispatch(logout());
            });
        })
        .catch((err) => {
          dispatch(logout());
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  }, [status]);
  const dispatch = useDispatch();
  if (loader) {
    return <Loader>Fetching Your Data...</Loader>;
  } else if (status) {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3 items-center">
        <Search setSearch={setSearch} searchContent={search} />
        <Notes search={search} />
        <AddNotes />
      </div>
    );
  } else {
    return <Loader>Please Login to Make Notes..</Loader>;
  }
}

export default Home;
