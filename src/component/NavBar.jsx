import React, { useContext, useState } from "react";
import logo from "../assets/elogo.png";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const NavBar = () => {
  const { logout } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  return (
    <>
      <nav className=" border-gray-200  w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
              Small Team
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={logo}
                alt="user photo"
              />
            </button>
            {isDropdownOpen && (
              <div
                className="z-50  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-64"
                id="user-dropdown"
              >
                <div className="px-4 py-2">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Small Team
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    smallteam760@gmail.com
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/"
                      
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                      
                  </li>
                  <li>
                    <Link
                      to={"/settings"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  
                  <li>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
