import React, { useEffect, useState } from "react";
import { Notes, Search } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const searchToggle = useSelector((state) => state.searchReducer.searchToggle);
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
  if (status) {
    return (
      <div className="w-full h-full p-5 bg-black/70 flex flex-col flex-grow gap-3 items-center">
        <Search
          setSearch={setSearch}
          searchContent={search}
          className={`${searchToggle ? "flex" : "hidden"} sm:flex`}
        />
        <Notes search={search} />
        <Link
          to="/new"
          className="fixed bottom-10 right-10 rounded-full bg-green-500 p-3"
        >
          <span className="text-2xl">📝</span>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full bg-black/70 flex justify-center items-center flex-grow">
        <h1 className="text-white text-xl font-bold">
          Please Login to Make Notes..
        </h1>
      </div>
    );
  }
}

export default Home;
