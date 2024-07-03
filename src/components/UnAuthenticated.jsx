import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UnAuthenticated({ children }) {
  const navigate = useNavigate();
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if (status) {
        navigate("/")
    }
  }, []);
  return <div className="h-full w-full">{children}</div>;
}

export default UnAuthenticated;
