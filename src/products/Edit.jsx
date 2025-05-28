import React, { useEffect, useState } from "react";
import SideLefe from "../component/SideLefe";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";
import axios from "axios";

const Edit = () => {
  const param = useParams();
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: async () => {
      try {
        const response = await fetch(`${apiUrl}/products/${param.id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          setImage(result.data.image);
          reset({
            title: result.data.title,
            category: result.data.category_id,
            brands: result.data.brand_id,
            short_description: result.data.short_description,
            description: result.data.description,
            quantity: result.data.quantity,
            price: result.data.price,
            status: result.data.status,
            is_feature: result.data.is_feature,
            discount: result.data.discount,
          });
        }
      } catch (error) {
        console.error("Submission Error:", error);
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });

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
      setDisable(true); // Disable the form to prevent double submission

      const formData = new FormData();

      // Append form fields
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("brands", data.brands);
      formData.append("status", data.status);
      formData.append("is_feature", data.is_feature);
      formData.append("short_description", data.short_description);
      formData.append("description", data.description);
      formData.append("quantity", data.quantity);

      // Laravel method spoofing for PUT
      formData.append("_method", "PUT");

      // Append image if selected
      const imageFile = document.getElementById("imageInput")?.files?.[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Send the request
      const response = await axios.post(
        `${apiUrl}/products/${param.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken()}`,
            Accept: "application/json",
            // NOTE: Do NOT set Content-Type manually; Axios sets it automatically for FormData
          },
          withCredentials: true, // Use this if dealing with cookies/session
        }
      );

      const result = response.data;
      setDisable(false);

      // Check if update was successful
      if (response.status === 200) {
        toast.success("Product updated successfully");
        navigate("/products");
      } else {
        // Handle validation errors or custom error messages
        if (result && result.errors) {
          let errorMessage = "";
          for (const field in result.errors) {
            errorMessage += `${field}: ${result.errors[field].join(", ")}\n`;
          }
          toast.error(errorMessage || "Product update failed.");
        } else {
          toast.error(result.message || "Product update failed.");
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setDisable(false);

      // Axios error handling
      if (error.response) {
        const result = error.response.data;
        if (result && result.errors) {
          let errorMessage = "";
          for (const field in result.errors) {
            errorMessage += `${field}: ${result.errors[field].join(", ")}\n`;
          }
          toast.error(errorMessage || "Update failed.");
        } else {
          toast.error(result.message || "Update failed.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.status === 201 || result.status === 200) {
        setCategories(result.data);
      } else {
        toast.error(result.message || "Category fetch failed.");
      }
    } catch (error) {
      console.error("Category Fetch Error:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${apiUrl}/brands`, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.status === 201 || result.status === 200) {
        setBrands(result.data);
      } else {
        toast.error(result.message || "Brand fetch failed.");
      }
    } catch (error) {
      console.error("Brand Fetch Error:", error);
      toast.error("Failed to fetch brands.");
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchBrands();
  }, []);

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
              <Link to={`/products`}>
                <button className="bg-blue-700 p-2 hover:bg-blue-500 rounded-sm w-[100px] text-white mb-4">
                  Back
                </button>
              </Link>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
              >
                {/* ... (rest of the form fields) */}
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

                {/* Category Select */}
                <div className="mb-4 gap-4 flex justify-end items-center w-full">
                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={Number(category.id)}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.category.message}
                    </p>
                  )}

                  {/* Brand Select */}
                  <select
                    {...register("brands", {
                      required: "Please select a brand",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Brands</option>
                    {brands?.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {errors.brands && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.brands.message}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="short_description"
                  >
                    Short Description
                  </label>
                  <textarea
                    rows={5}
                    {...register("short_description", {
                      required: "Short description is required",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                  {errors.short_description && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.short_description.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    rows={5}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Price Fields */}
                <h3 className="text-[20px] text-2xl">Price</h3>
                <br />
                <div className="mb-4 gap-4 flex justify-end items-center w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Price"
                    {...register("price", { required: "Price is required" })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Quantity"
                    {...register("quantity", {
                      required: "Quantity is required",
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <label htmlFor="image">Image</label>
                <div className="mb-4 relative border-2 border-gray-500 cursor-pointer w-[100px] h-[100px]">
                  {image && (
                    <img
                      src={image}
                      alt="uploaded"
                      className="rounded-sm object-cover w-[90px] h-[90px]"
                    />
                  )}
                  <input
                    type="file"
                    id="imageInput"
                    onChange={handleImageChange}
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                  />
                </div>

                {/* Status */}
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

                {/* Feature Select */}
                <div className="mb-4 mt-7">
                  <select
                    {...register("is_feature", {
                      required: "Please select a feature",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Feature</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.is_feature && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.is_feature.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mb-4">
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

export default Edit;
