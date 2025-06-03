import React, { useEffect, useState } from "react";
import { adminToken, apiUrl } from "../component/htpds";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { toast } from "react-toastify";

const Show = () => {
  // Set categories
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  // Fetch categories API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/footer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();
      console.log("Result:", result);

      setLoading(false);
      if (result.status === 200) {
        setCategories(result.data);
        console.log("footer:", result.data);
        
      } else {
        console.log("Fetch footer Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch footer Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/footer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`, // Make sure adminToken() returns a valid string
        },
      });

      if (!response.ok) {
        let errorMessage = "Failed to delete slide";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch (e) {
          console.warn("Failed to parse JSON error response", e);
        }
        throw new Error(errorMessage);
      }

      toast.success("footer deleted successfully");
      navigator("/footer"); // Redirect to slide list page
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting slide: " + error.message);
    }
  };
  return (
    <div className="relative h-scree w-full mt-4 p-2  shadow-md ">
      <Link
        to={`/footer/create`}
        className="flex justify-end mb-2 rounded-full"
      >
        <button className="bg-blue-500 w-[120px] mb-2 p-2 rounded-sm text-white">
          {" "}
          Create{" "}
        </button>
      </Link>
      {loading == true && (
        <div className="flex justify-center w-full h-full items-center">
          <Loading />
        </div>
      )}
      {loading == false && categories.length == 0 && (
        <p className="text-center text-red-600 p-2 text-[20px]">
          {" "}
          Footer not found{" "}
        </p>
      )}
      {categories && categories.length > 0 && (
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              
              <th scope="col" className="px-6 py-3">
                Link
              </th>
              <th scope="col" className="px-6 py-3">
                Icons
              </th>
              <th scope="col" className="px-6 py-3">
                Copyright
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.link}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img src={category.icon} className="w-[40px] h-auto object-contain" alt={category.icon} />
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.copy_right}
                  </th>
                  
                  <td className="px-6 py-4">
                    <Link
                      to={`/footer/edit/${category.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link className="font-medium text-red-600 dark:text-red-500 ml-3 hover:underline">
                      <button onClick={() => handleDelete(category.id)}>
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="3">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Show;
