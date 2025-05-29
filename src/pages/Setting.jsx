import React, { useState, useEffect } from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/camera.png"; // Default image if no logo is set

const Setting = () => {
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(noImage); // URL for preview
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Fetch existing settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${apiUrl}/settings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
          credentials: "include",
        });

        const result = await response.json();
        if (result.status === 200) {
          reset({
            title: result.data.title,
            address: result.data.address,
            phone: result.data.phone,
            link: result.data.link,
          });
          setImagePreview(result.data.logo); // show existing logo
        } else {
          toast.error(result.message || "Failed to load settings.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    };

    fetchSettings();
  }, [reset]);

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
        formData.append("logo", image);
      }

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`${apiUrl}/settings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      setDisable(false);

      if (response.ok && result.status === 200) {
        toast.success("Setting updated successfully");
        navigate("/settings");
      } else {
        toast.error(result.message || "Setting update failed");
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
      <div className="sm:ml-64 h-screen">
        <div className="p-4 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-4 mb-4">
              <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
                <NavBar />
                <div className="flex-1 p-6 bg-white shadow-md">
                  <h2 className="text-2xl font-bold">General Settings</h2>

                  <div className="mt-4 flex flex-col">
                    <label className="block text-gray-700">Site Title</label>
                    <input
                      type="text"
                      {...register("title", { required: "Site title is required" })}
                      className="mt-2 w-full p-2 border rounded"
                      placeholder="Enter site title"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}

                    <label className="block text-gray-700 mt-4">Phone</label>
                    <input
                      type="text"
                      {...register("phone", { required: "Phone is required" })}
                      className="mt-2 w-full p-2 border rounded"
                      placeholder="Enter phone"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

                    <label className="block text-gray-700 mt-4">Address</label>
                    <input
                      type="text"
                      {...register("address", { required: "Address is required" })}
                      className="mt-2 w-full p-2 border rounded"
                      placeholder="Enter address"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}

                    <label className="block text-gray-700 mt-4">Link</label>
                    <input
                      type="text"
                      {...register("link", { required: "Link is required" })}
                      className="mt-2 w-full p-2 border rounded"
                      placeholder="Enter link"
                    />
                    {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>}

                    <label className="block text-gray-700 mt-4">Logo</label>
                    <div className="mb-4 relative border-2 border-gray-500 cursor-pointer w-[100px] h-[100px]">
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

                    <button
                      type="submit"
                      disabled={disable}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      {disable ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
