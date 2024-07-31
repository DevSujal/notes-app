import React from "react";
import { Logout } from "../components";

function Setting() {
  return (
    <div className="flex-grow bg-black/70">
      <div className="flex justify-center p-2">
        <Logout className="rounded w-11/12 max-w-96 h-fit hover:bg-blue-600" />
      </div>
      <div className="flex-grow"></div>
    </div>
  );
}

export default Setting;
