import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideLefe from "../components/SideLefe";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "../../component/htpds";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: async () => {
      try {
        // setDisable(true);

        const response = await fetch(`${apiUrl}/account/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
          body: JSON.stringify(),
          credentials: "include",
        });

        const result = await response.json();
        console.log(result);
        // setDisable(false);
        if (result.status === 200) {
          setProfile(result.data);
          reset({
            name: result.data.name,
            email: result.data.email,
            address: result.data.address,
            mobile: result.data.mobile,
            city: result.data.city,
            zip: result.data.zip,
            country: result.data.country,
          });
        }
      } catch (error) {
        console.error("Submission Error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      
      setDisable(true);
      console.log(data);
      const response = await fetch(`${apiUrl}/account/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      setDisable(false);
      if (result.status === 200) {
        toast.success("profile created successfully " + result.data);
        navigate("/account/dashboard");
      } else {
        toast.error(result.message || "profile creation failed.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <>
      {/* navbar */}

      {/* aside */}

      <div className="-mt-2 sm:ml-64">
        <SideLefe />
        <Navbar />
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50">
            <div className="relative w-full overflow-x-auto shadow-md">
              <form
                onSubmit={handleSubmit(onSubmit)} // Fixed form submission handler
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
                    placeholder="Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
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
                    type="number"
                    placeholder="Phone"
                    {...register("mobile", {
                      required: "phone is required",
                    })}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.mobile.message}
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Country
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="country"
                    {...register("country", {
                      required: "country is required",
                    })}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    disabled={disable}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Profile
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
