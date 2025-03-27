import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, NavLink } from "react-router-dom";
import Search from "./Search";
import {
  Notebook,
  // Search,
  Plus,
  Grid,
  List,
  Filter,
  SortAsc,
  Menu,
  X,
  Settings,
  User,
  LogIn,
  UserPenIcon,
} from "lucide-react";

function Header({ className }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const status = useSelector((state) => state.authReducer.status);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    {
      element: (
        <Link to="/home" className="p-2 text-gray-300 hover:text-white">
          <User className="h-5 w-5" />
        </Link>
      ),
      name: "Home",
      auth: true,
    },
    {
      element: (
        <Link to="setting" className="p-2 text-gray-300 hover:text-white">
          <Settings className="h-5 w-5" />
        </Link>
      ),
      name: "Settings",
      auth: status,
    },
    {
      element: (
        <NavLink
          className={({ isActive }) =>
            ` w-full flex justify-around sm:w-fit p-2 hover:opacity-85 ${
              isActive ? "bg-orange-600" : "bg-blue-600"
            } rounded`
          }
          to="/login"
        >
          <span>🔐</span>
          <span>Login</span>
        </NavLink>
      ),
      name: "Login",
      auth: !status,
    },
    {
      element: (
        <NavLink
          className={({ isActive }) =>
            ` w-full flex justify-around sm:w-fit p-2 hover:opacity-85 ${
              isActive ? "bg-orange-600" : "bg-blue-600"
            } rounded`
          }
          to="/register"
        >
          <span>🔒</span>
          <span>sign up</span>
        </NavLink>
      ),
      name: "Signup",
      auth: !status,
    },
    {
      element: (
        <Link
          to="/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200 flex justify-center items-center w-full space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Note</span>
        </Link>
      ),
      name: "",
      auth: status,
    },
  ];

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 fixed w-full z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Notebook className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">MyNotes</span>
            </Link>

            {/* Search - Hidden on mobile */}
            {location.pathname === "/home" && (
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <Search />
                </div>
              </div>
            )}
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center space-x-4">
              {links.map(
                (link, index) =>
                  link.auth && <div key={link.name}>{link.element}</div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex mb-4">
                <div className="relative w-full">
                  <Search />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {links.map(
                  (link, index) =>
                    link.auth && (
                      <div
                        key={link.name}
                        className="flex justify-center items-center"
                      >
                        {link.element} {link.name}
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
}

export default Header;
