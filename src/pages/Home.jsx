import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Notes from "../components/Notes";
import AddNotes from "../components/AddNotes";
import { Loader } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
if (status) {
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
