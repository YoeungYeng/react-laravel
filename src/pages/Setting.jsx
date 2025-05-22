import React, { useState } from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const Setting = () => {
  const [siteTitle, setSiteTitle] = useState("Small Team");

  return (
    <>
      <SideLefe />
      <div className="sm:ml-64 h-screen  ">
        <div className="p-4  rounded-lg dark:border-gray-700">
          <div className=" gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              {/* navbar */}
              <NavBar />
              {/* setting */}
              <div className="flex-1 p-6 bg-white shadow-md">
                <h2 className="text-2xl font-bold">General Settings</h2>

                {/* Site Title Setting */}
                <div className="mt-4 flex flex-col ">
                  <label className="block  text-gray-700 w-[100px] ">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter site title"
                  />
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="text"
                    value={"smallteam760@gmail.com"}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter site title"
                  />
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={"074567901"}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter site title"
                  />
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    value={"123 Main St, City, Country"}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter site title"
                  />
                  <label className="block text-gray-700">Link</label>
                  <input
                    type="text"
                    value={"Links"}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter site title"
                  />
                  <label className="block text-gray-700">Logo</label>
                  <input
                    type="file"
                    className="mt-2 w-full p-2 border rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Save Changes
                  </button>
                </div>
                
              </div>
              {/* footer */}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
