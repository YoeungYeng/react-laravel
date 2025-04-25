import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../component/htpds';
import Footer from '../component/Footer';
import SideLefe from '../component/SideLefe';
import NavBar from '../component/NavBar';

const Edit = () => {

  const param = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  
  const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm({
      defaultValues: async () =>{
        try {
          // setDisable(true);
          
          const response = await fetch(`${apiUrl}/categories/${param.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${adminToken()}`,
            },
            body: JSON.stringify(),
            credentials: "include",
          });
          const result = await response.json();
          // console.log(result);
          // setDisable(false);
          if (result.status === 200) {
            console.log(result)
            // setCategory(result.data);
            reset({
              name: result.data.name,
              status: result.data.status
            })
            
            
          }else{
            console.log(errors)
          }
          
        } catch (error) {
          console.error("Submission Error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      
      }
    });
  
  const onSubmit = async (data) => {
      try {
        // setDisable(true);
        console.log(data);
        const response = await fetch(`${apiUrl}/categories/${param.id}`, {
          method: "PUT",
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
        // setDisable(false);
        if (result.status === 201 || result.status === 200) {
          toast.success("Category created successfully "+ result.status);
          
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
      <div className=" sm:ml-64 h-screen" style={{ backgroundImage: "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)", backgroundBlendMode: "multiply" }}
      >
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
              <Link to={`/categories`}>
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
                    Category Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Category Name"
                    {...register("name", {
                      required: "Category name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <select
                    {...register("status", {
                      required: "Please select a status",
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    
                    type="submit"
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
  )
}

export default Edit