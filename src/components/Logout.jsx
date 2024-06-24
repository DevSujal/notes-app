import React from "react";
import Button from "./Button";
import auth from "../app write services/auth.service";
import { useDispatch } from "react-redux";
import { logout as storeLogout } from "../Store/features/authSlice";
import { useNavigate } from "react-router-dom";
function Logout({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logout = () => {
    auth.logout().then((user) => {
      if (user) {
        dispatch(storeLogout());
      }
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
