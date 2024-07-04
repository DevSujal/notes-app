import React from "react";
import { Logout } from "../components";

function Setting() {
  return (
    <div className="flex-grow bg-black/80">
      <Logout className="rounded absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-24 w-10/12 max-w-96 hover:bg-blue-600" />
    </div>
  );
}

export default Setting;
