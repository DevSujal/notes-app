import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
  return (
    <>
    <div className="h-14 bg-black/70"></div>
      <div
        className={`w-full fixed flex sm:flex-row text-white h-14 p-3 justify-between bg-black/50 items-center ${className}`}
      >
        <h1>Hi, {userData?.name.toUpperCase()}</h1>
        <button
          onClick={() =>
            setIsMenuOpen((prev) => {
              return !prev;
            })
          }
          className={`sm:hidden text-xl z-20 absolute ${
            isMenuOpen ? "right-40" : "right-6"
          } transition-all bg-black/50 px-2 py-1 rounded`}
        >
          ☰
        </button>
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
