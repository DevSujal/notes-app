import React, { useState } from "react";
import Search from "../components/Search";
import Notes from "../components/Notes";
import Logout from "../components/Logout";
import AddNotes from "../components/AddNotes";

function Home() {

  const [search, setSearch] = useState("")
  return (
    <div className="h-screen w-screen p-5 flex flex-col gap-3 items-center">
      <Search setSearch = {setSearch} searchContent={search}/>
      <Notes setSearch = {setSearch} search={search}/>
      <AddNotes />
      <Logout className="absolute left-6 bottom-6 font-bold py-2 rounded cursor-pointer hover:bg-blue-600"/>
    </div>
  );
}

export default Home;
