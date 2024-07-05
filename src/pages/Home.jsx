import React, { useState } from "react";
import { AddNotes, Notes, Search } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
  if (status) {
    return (
      <div className="w-full h-full p-5 bg-black/80 flex flex-col flex-grow gap-3 items-center">
        <Search setSearch={setSearch} searchContent={search} />
        <Notes search={search} />
        <AddNotes />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full bg-black/80 flex justify-center items-center flex-grow">
        <h1 className="text-white text-xl font-bold">
          Please Login to Make Notes..
        </h1>
      </div>
    );
  }
}

export default Home;
