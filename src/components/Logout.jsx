import React, { useState } from "react";
import Button from "./Button";
import auth from "../app write services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { logout as storeLogout } from "../Store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { clearNotes } from "../Store/features/notesSlice";
import Loader from "./Loader";
function Logout({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.authReducer.status);
  const [loader, setLoader] = useState(false);
  const logout = () => {
    setLoader(true);
    auth
      .logout()
      .then((user) => {
        if (user) {
          dispatch(storeLogout());
          dispatch(clearNotes());
        }

        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return loader ? (
    <Loader>Please Wait...</Loader>
  ) : (
    <Button onClick={logout} className={`${className}`} type="button">
      Logout
    </Button>
  );
}

export default Logout;
