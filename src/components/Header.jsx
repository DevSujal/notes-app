import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header({ className }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const status = useSelector((state) => state.authReducer.status);
  const links = [
    {
      name: "Home",
      to: "/",
      auth: true,
    },
    {
      name: "Settings",
      to: "/setting",
      auth: status,
    },
    {
      name: "Login",
      to: "/login",
      auth: !status,
    },
    {
      name: "Sign Up",
      to: "/register",
      auth: !status,
    },
  ];
  return (
      <div
        className={`w-full flex  text-white h-14 p-3 justify-between items-center bg-gray-900 ${className}`}
      >
        <h1>Hi, {userData?.name.toUpperCase()}</h1>
        <div className="flex justify-between items-center gap-4">
          {links.map(
            (link) =>
              link.auth && (
                <NavLink key={link.name} className={({isActive}) => `p-2 hover:opacity-85 ${isActive ? "bg-orange-600" : "bg-blue-600" } rounded`} to={link.to}>
                  {link.name}
                </NavLink>
              )
          )}
        </div>
      </div>
  );
}

export default Header;
