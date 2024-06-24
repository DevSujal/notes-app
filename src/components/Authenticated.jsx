import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../app write services/auth.service";
import { login } from "../Store/features/authSlice";
import Loader from "./Loader";

function Authenticated({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if (!status) {
      auth.getCurrentUser().then((user) => {
        if(user) {
          dispatch(login(user))
        }
        else{
          navigate("/login");
        }
      });
    }
  }, [status, navigate]);
  return !status ? <Loader /> : <div className="h-full">{children}</div>;
}

export default Authenticated;
