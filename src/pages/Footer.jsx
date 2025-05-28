import React from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import { default as Footers } from "../component/Footer";
import Show from "../footer/Show";

const Footer = () => {
  return (
    <>
      <SideLefe />
      {/* layout */}
      <div className="sm:ml-64 h-screen  ">
        <div className="p-4  rounded-lg dark:border-gray-700">
          <div className=" gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <NavBar />
            </div>
          </div>

          <div className="flex items-center justify-center mb-4 rounded-sm ">
            <Show />
          </div>

          {/* footer */}
          <Footers />
        </div>
      </div>
    </>
  );
};

export default Footer;
