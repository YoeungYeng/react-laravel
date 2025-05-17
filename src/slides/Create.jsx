import React, { useState } from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";

const Create = () => {
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      const formData = new FormData();
      if (image) {
        const blob = await fetch(image).then((r) => r.blob());
        formData.append("image", blob, "image.jpg");
      }
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`${apiUrl}/slides`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      setDisable(false);
      if (response.status === 201) {
        toast.success("Product created successfully");
        navigate("/slides");
      } else {
        toast.error(result.message || "Product creation failed.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setDisable(false);
    }
  };

  return (
    <>
      <SideLefe />
      <div className="z-40 sm:ml-64 h-screen bg">
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
              <Link to={`/slides`}>
                <button className="bg-blue-700 p-2 hover:bg-blue-500 rounded-sm w-[100px] text-white mb-4">
                  Back
                </button>
              </Link>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* SubTitle Fields */}

                <div className="mb-4 gap-4 flex justify-end items-center w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sub Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Sub Title"
                    {...register("subtitle", { required: "Price is required" })}
                  />
                  {errors.subtitle && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <label htmlFor="image">Image</label>
                <div className="mb-4 relative border-2 bg-slate-500 border-gray-500 cursor-pointer w-[100px] h-[100px]">
                  {image && (
                    <img
                      src={image}
                      alt="uploaded"
                      className="rounded-sm object-cover w-full h-full"
                    />
                  )}
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="opacity-0  cursor-pointer"
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-4 mt-9">
                  <button
                    type="submit"
                    disabled={disable}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
