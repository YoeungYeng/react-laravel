import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "./htpds";
import Loading from "./Loading";
const NavBar = () => {
  const { logout } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const fetchLogo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();
      console.log("Result:", result);

      setLoading(false);
      if (result.status === 200) {
        setProduct(result.data);
        console.log("Categories:", result.data);
      } else {
        console.log("Fetch Categories Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);
  return (
    <>
      <nav className=" border-gray-200  w-full">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse">
                <Loading />
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src={`${product.logo}`}
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
                  {product.title}
                </span>
              </div>
            )}
          </Link>
          <div className="flex bg items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse">
                  <Loading />
                </div>
              ) : (
                <img
                  className="w-8 h-8 rounded-full"
                  src={product.logo}
                  alt="user photo"
                />
              )}
            </button>
            {isDropdownOpen && (
              <div
                className="z-50  text-base list-none w-[140px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-52"
                id="user-dropdown"
              >
                <div className="px-4 py-2">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {product.title}
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
