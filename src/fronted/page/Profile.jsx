import React from "react";
import Navbar from "../components/Navbar";
import SideLefe from "../components/SideLefe";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";

const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* aside */}
      <SideLefe />
      <div className="-mt-2 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50">
            <div className="relative w-full overflow-x-auto shadow-md">
              <form
                // onSubmit={handleSubmit(onSubmit)} // Fixed form submission handler
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4 flex gap-2 items-center">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-b w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Address
                  </label>
                  <textarea
                    name=""
                    rows={5}
                    cols={20}
                    className="w-full outline-none border-gray-500 border"
                  ></textarea>
                </div>
                <div className="mb-4 flex gap-2 items-center mt-3">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Phone
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 flex items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Zip
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Zip Code"
                    {...register("zip", {
                      required: "Zip code is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                  <select
                    {...register("status", {
                      required: "Please select a status",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    // disabled={disable}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* footer */}
    </>
  );
};

export default Profile;
