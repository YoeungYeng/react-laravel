import React, { useEffect, useState } from "react";
import SideLefe from "../component/SideLefe";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import axios from "axios";

const Update = () => {
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/slides/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });

        const result = await response.json();
        if (result.status === 200) {
          setImage(result.data.image);
          reset({
            title: result.data.title,
            subtitle: result.data.subtitle,
          });
        } else {
          toast.error(result.message || "Failed to fetch data");
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, [id, reset]);

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
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("_method", "put");

      const fileInput = document.getElementById("imageInput");
      if (fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const response = await axios.post(`${apiUrl}/slides/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = response.data;

      setDisable(false);

      if (response.status === 200) {
        toast.success("Slide updated successfully");
        navigate("/slides");
      } else {
        if (result?.errors) {
          const messages = Object.entries(result.errors)
            .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
            .join("\n");
          toast.error(messages);
        } else {
          toast.error(result.message || "Update failed.");
        }
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
      <div className="z-40 sm:ml-64 h-screen bg">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <NavBar />
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="Subtitle"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("subtitle", {
                      required: "Subtitle is required",
                    })}
                  />
                  {errors.subtitle && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>

                <label htmlFor="imageInput">Image</label>
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
                    id="imageInput"
                    onChange={handleImageChange}
                    className="opacity-0 cursor-pointer absolute inset-0"
                  />
                </div>

                <div className="mb-4 mt-9">
                  <button
                    type="submit"
                    disabled={disable}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
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

export default Update;
