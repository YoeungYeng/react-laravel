import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthUserContext } from "../../context/AuthUser";
import { apiUrl } from "../../component/htpds";

const Register = () => {
  const {login} = useContext(AuthUserContext); // Added login function
  
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/account/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const resData = await response.json(); // Parsing JSON response

      if (response.ok) {
        const userInfo = {
          token: resData.token,
          id: resData.id,
          name: resData.name,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        login(userInfo); // Added login function
        navigate("/account/login");
      } else {
        toast.error(resData.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <div
        class="min-h-screen w-f flex fle-col items-center justify-center py-6 px-4"
        style={{
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        }}
      >
        <div class=" max-w-xs flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="bg-slate-50 w-[700px] h-[400px]  flex justify-center items-center flex-col shadow-md rounded p-4"
          >
            <h1 className="text-2xl">User Form </h1>
            <div class="mb-4">
              <label
                htmlFor="username"
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // id="username"
                type="text"
                placeholder="Username "
                {...register("name", {
                  required: "Name is required",
                })} // Fixed "mail" to "email"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <label
                htmlFor=""
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // id="username"
                type="email"
                placeholder="email "
                {...register("email", {
                  required: "Email Address is required",
                })} // Fixed "mail" to "email"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div class="mb-6">
              <label
                htmlFor="password"
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <span> Already, have account <a className="text-red-500 hover:underline" href={'/account/login'}> Sign Up </a> </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
