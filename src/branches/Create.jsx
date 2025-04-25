import React, { useState } from "react";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SideLefe from "../component/SideLefe";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";

const Create = () => {
  const [disable, setDisable] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      console.log(data);
      const response = await fetch(`${apiUrl}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      setDisable(false);
      if (result.status === 201) {
        toast.success("Brand created successfully " + result.status);
        navigate("/brands");
      } else {
        toast.error(result.message || "Brand creation failed.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <SideLefe />
      <div className="-mt-2 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <NavBar />
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50">
            <div className="relative w-full overflow-x-auto shadow-md">
              <Link to={`/brands`}>
                <button className="bg-blue-700 p-2 hover:bg-blue-500 rounded-sm w-[100px] text-white mb-4">
                  Back
                </button>
              </Link>

              <form
                onSubmit={handleSubmit(onSubmit)} // Fixed form submission handler
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Brands Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Entry, Brands"
                    {...register("name", {
                      required: "Brands is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <select
                    {...register("status", {
                      required: "Please select a status",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Block</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={disable}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Creat
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Create;
