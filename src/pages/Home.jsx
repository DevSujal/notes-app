import React, { useEffect, useState } from "react";
import { Notes, Search } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import image from "../assets/image.png";

function Home() {
  const searchToggle = useSelector((state) => state.searchReducer.searchToggle);
  const status = useSelector((state) => state.authReducer.status);
  const [search, setSearch] = useState("");
  if (status) {
    return (
      <div className="w-full h-full p-5 bg-transparent flex flex-col flex-grow gap-3 items-center">
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
      <div className="w-full h-screen base-color flex flex-col justify-center items-center">
        <img className="max-w-96" src={image} />
        <p> <strong> create your first note! </strong></p>
      </div>
    );
  }
}

export default Home;
