import React, {useState } from "react";
import { AddNotes, Notes, Search } from "../components";
import {useSelector } from "react-redux";

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
    return (
      <h1 className="text-white m-auto text-xl font-bold">
        Please Login to Make Notes..
      </h1>
    );
  }
}

export default Home;
