import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/elogo.png";

const SideLefe = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Link to={"/"} className="flex items-center ps-2.5 mb-5">
            <img src={logo} className="h-6 me-3 sm:h-7" alt="Logo" />
            <span className="self-center text-xl font-semibold dark:text-white">
              Small Team
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {[
              { name: "Dashboard", path: "/" },
              { name: "Categories", path: "/categories" },
              { name: "Brands", path: "/brands" },
              { name: "Users", path: "/users" },
              { name: "slide", path: "/slides" },
              { name: "Products", path: "/products" },
              { name: "Orders", path: "/orders" },
              
              { name: "Settings", path: "/settings" },
              
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg transition duration-75 ${
                    location.pathname === item.path
                      ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex-1 ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideLefe;
