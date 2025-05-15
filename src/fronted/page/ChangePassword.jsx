import React, { useState } from "react";
import SideLefe from "../components/SideLefe";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import { apiUrl, userToken } from "../../component/htpds";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState([]);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {
      register,
      formState: { errors },
      handleSubmit,
      
    } = useForm();

    const onSubmit = async (data) => {
        try {
              setDisable(true);
              console.log(data);
              const response = await fetch(`${apiUrl}/account/resetpassword`, {
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
              if (result.status === 201) {
                toast.success("password reset successfully " + result.status);
                navigate("/account/changepassword");
              } else {
                toast.error(result.message || "reset password failed.");
              }
            } catch (error) {
              console.error("Submission Error:", error);
              toast.error("An unexpected error occurred. Please try again.");
            }
    }
  return (
    <>
      {/* lefe side */}

      <div class="sm:ml-64 h-screen  ">
        <div class="p-4  rounded-lg dark:border-gray-700">
          <div class=" gap-4 mb-4">
            <div class="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-1xl text-gray-400 dark:text-gray-500">
                {/* navbar */}

                <SideLefe />
                <Navbar />
              </p>
            </div>
          </div>
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
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <br />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.email.message}
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
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                
                
               

                <div className="mb-4">
                  <button
                    // disabled={disable}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
