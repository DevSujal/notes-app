import React from "react";
import Button from "./Button";
import auth from "../app write services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { logout as storeLogout } from "../Store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { clearNotes } from "../Store/features/notesSlice";
function Logout({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const status = useSelector(state => state.authReducer.status)
  const logout = () => {
    auth.logout().then((user) => {

      if (user) {
        dispatch(storeLogout());
        dispatch(clearNotes())
      }

      console.log(status)
      navigate("/login")
    }).catch((err) => {
        console.log(err);
    })
  };
  return (
    <Button onClick={logout} className={`${className}`} type="button">
      Logout
    </Button>
  );
}

export default Logout;
