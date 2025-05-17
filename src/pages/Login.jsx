import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from "../component/htpds";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {login} = useContext(AuthContext); // Added login function
  
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
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
        const adminInfo = {
          token: resData.token,
          id: resData.id,
          name: resData.name,
        };
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        login(adminInfo); // Added login function
        navigate("/");
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
        className="min-h-screen w-f flex fle-col items-center justify-center py-6 px-4"
        style={{
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        }}
      >
        <div className=" max-w-xs flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-50 w-[700px] h-[400px]  flex justify-center items-center flex-col shadow-md rounded "
          >
            <h1 className="text-2xl">Admin Form </h1>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username "
                {...register("email", {
                  required: "Email Address is required",
                })} // Fixed "mail" to "email"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
