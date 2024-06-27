import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Authenticated({ children }) {
  const navigate = useNavigate();
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if(!status){
      navigate("/")
    }
  }, []);
  return !status ? <Loader /> : <div className="h-full">{children}</div>;
}

export default Authenticated;
