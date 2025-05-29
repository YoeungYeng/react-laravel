import React, { useState } from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Footer from "../component/Footer";
import Show from "../cantories/Show";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";
import noImage from "../assets/camera.png";


const Create = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(noImage); // URL for preview

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      console.log(data);
      const response = await fetch(`${apiUrl}/categories`, {
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
      if (result.status === 201 || result.status === 200) {
        toast.success("Category created successfully " + result.status);
        navigate("/categories");
      } else {
        toast.error(result.message || "Category creation failed.");
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
              <Link to={`/footer`}>
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
                    Team Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Category Name"
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Links
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="entry link"
                    {...register("link", {
                      required: " link is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Copyright
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="entry copyright"
                    {...register("copyright", {
                      required: "copyright is required",
                    })}
                  />
                  <label className="block text-gray-700 mt-4">Logo</label>
                  <div className="mb-4 relative border-2  cursor-pointer w-[100px] h-[100px] flex items-center justify-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Logo Preview"
                        className="rounded-sm object-cover w-[90px] h-[90px]"
                      />
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    />
                  </div>
                  {errors.copyright && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.copyright.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    disabled={disable}
                    type="submit"
                    className="bg-blue-500 w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create
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
