import React, { useEffect, useState } from "react";
import { Notes, Search } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";

function Home() {
  const searchToggle = useSelector((state) => state.searchReducer.searchToggle);
  const status = useSelector((state) => state.authReducer.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (!status) {
      navigate("/login");
    }
  }, [status]);

  return (
    <div className="w-full h-full p-5 bg-transparent flex flex-col flex-grow gap-3 items-center">
      <Notes />
      <Link
        to="/new"
        className="fixed bottom-10 right-10 rounded-full bg-green-500 p-3"
      >
        <span className="text-2xl">📝</span>
      </Link>
    </div>
  );
}

export default Home;
