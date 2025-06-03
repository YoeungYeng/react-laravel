import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Components
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

// Constants
import { adminToken, apiUrl } from "../component/htpds";

// Assets
import noImage from "../assets/camera.png";

const Create = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(noImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

      const formData = new FormData();

      if (image) {
        formData.append("icon", image);
      }

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`${apiUrl}/footer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
          Accept: "application/json",
        },
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      setDisable(false);

      if (response.ok) {
        toast.success("Footer item created successfully.");
        navigate("/footer");
      } else {
        toast.error(result.message || "Creation failed.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred.");
      setDisable(false);
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
            <div className="relative w-full overflow-x-auto shadow-md p-4">
              <Link to="/footer">
                <button className="bg-blue-700 p-2 hover:bg-blue-500 rounded-sm w-[100px] text-white mb-4">
                  Back
                </button>
              </Link>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Team Name
                  </label>
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Team Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Links
                  </label>
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Entry link"
                    {...register("link", { required: "Link is required" })}
                  />
                  {errors.link && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.link.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Copyright
                  </label>
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Copyright"
                    {...register("copy_right", {
                      required: "Copyright is required",
                    })}
                  />
                  {errors.copy_right && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.copy_right.message}
                    </p>
                  )}

                  <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                    Logo
                  </label>
                  <div className="relative border-2 cursor-pointer w-[100px] h-[100px] flex items-center justify-center">
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
                </div>

                <div className="mb-4">
                  <button
                    disabled={disable}
                    type="submit"
                    className={`w-52 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      disable
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {disable ? "Submitting..." : "Create"}
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
