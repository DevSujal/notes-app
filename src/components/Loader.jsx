import React from "react";
import ReactLoading from "react-loading";
function Loader() {
  return (
    <div className="absolute text-white font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h1 className="text-5xl">
        <ReactLoading type="bars" color="#0000FF" height={100} width={100} />
      </h1>
    </div>
  );
}

export default Loader;
