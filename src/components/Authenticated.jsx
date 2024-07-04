import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Loader} from "../components";

function Authenticated({ children }) {
  const navigate = useNavigate();
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if(!status){
      navigate("/")
    }
  }, []);
  return !status ? <Loader /> : <>{children}</>;
}

export default Authenticated;
