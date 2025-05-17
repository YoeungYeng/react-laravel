import React from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Footer from "../component/Footer";
import Show from "../cantories/Show";

const Categorie = () => {
  return (
    <>
      <SideLefe />
      {/* container */}
      <div className="-mt-2 sm:ml-64" style={{ backgroundImage: "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)", backgroundBlendMode: "multiply" }}
      >
        <div className="p-4  rounded-lg dark:border-gray-700">
          <div className=" gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                {/* navbar */}
                <NavBar />
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50 ">
            <Show />
          </div>

          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Categorie;
