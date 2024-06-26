import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../app write services/auth.service";
import { login, logout } from "../Store/features/authSlice";
import Loader from "./Loader";
import database from "../app write services/database.service";
import { addNote } from "../Store/features/notesSlice";

function Authenticated({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if (!status) {
      auth.getCurrentUser().then((user) => {
        if (user) {
          dispatch(login(user));
          database.getAllNotes(user).then((data) => {
            if (data) {
              dispatch(addNote(data.documents));
            }
          });
        } else {
          navigate("/login");
        }
      }).catch((err) => {
        dispatch(logout())
      })
    }
  }, [status, navigate]);
  return !status ? <Loader /> : <div className="h-full">{children}</div>;
}

export default Authenticated;
