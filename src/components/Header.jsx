import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleSearch } from "../Store/features/searchSlice";

function Header({ className }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const status = useSelector((state) => state.authReducer.status);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [
    {
      icon: "🏠",
      name: "Home",
      to: "/",
      auth: true,
    },
    {
      icon: "⚙️",
      name: "Settings",
      to: "/setting",
      auth: status,
    },
    {
      icon: "🔑",
      name: "Login",
      to: "/login",
      auth: !status,
    },
    {
      icon: "🔒",
      name: "Sign Up",
      to: "/register",
      auth: !status,
    },
    {
      icon: "📝",
      name: "New Note",
      to: "/new",
      auth: status,
    },
  ];

  const dispatch = useDispatch();
  return (
    <>
      <div className="h-14 base-color"></div>
      <div
        className={`w-full fixed flex sm:flex-row text-white h-14 p-3 justify-between base-color items-center ${className}`}
      >
        <h1>Hi, {userData?.name.toUpperCase()}</h1>
        <div
          className={`sm:hidden text-xl z-20 absolute ${
            isMenuOpen ? "right-40" : "right-6"
          } transition-all gap-2 flex px-2 py-1 rounded`}
        >
          <span
            onClick={() => {
              dispatch(toggleSearch());
            }}
            className="text-2xl rounded-full cursor-pointer p-2"
          >
            🔍
          </span>
          <button
            onClick={() =>
              setIsMenuOpen((prev) => {
                return !prev;
              })
            }
          >
            ☰
          </button>
        </div>
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className="w-full h-full fixed top-0 left-0 bg-transparent"
          ></div>
        )}
        <div
          className={`flex justify-between items-center gap-4 sm:flex-row flex-col absolute bg-black/70 sm:static right-3 sm:bg-transparent top-3 p-4 ${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          {links.map((link) => {
            return (
              link.auth && (
                <NavLink
                  key={link.name}
                  className={({ isActive }) =>
                    ` w-full flex justify-around sm:w-fit p-2 hover:opacity-85 ${
                      isActive ? "bg-orange-600" : "bg-blue-600"
                    } rounded`
                  }
                  to={link.to}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Header;
