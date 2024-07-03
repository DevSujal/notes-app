import React, { useState } from "react";
import Button from "./Button";
import auth from "../app write services/auth.service";
import { useDispatch} from "react-redux";
import { logout as storeLogout } from "../Store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { clearNotes } from "../Store/features/notesSlice";
import Loader from "./Loader";
function Logout({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const logout = async () => {
    try {
      setLoader(true);
      const user = await auth.logout();

      if (!user) {
        throw Error("user no logged out");
      }

      dispatch(storeLogout());
      dispatch(clearNotes());
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return loader ? (
    <Loader/>
  ) : (
    <Button onClick={logout} className={`${className}`} type="button">
      Logout
    </Button>
  );
}

export default Logout;
