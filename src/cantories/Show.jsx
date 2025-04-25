import React, { useEffect, useState } from "react";
import { adminToken, apiUrl } from "../component/htpds";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Show = () => {
  // Set categories
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/categories`, {
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
        console.log("Categories:", result.data);
      } else {
        console.log("Fetch Categories Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="relative h-scree w-full mt-4 p-2  shadow-md " >
      <Link to={`/categories/create`} className="flex justify-end mb-2 rounded-full">
        <button className="bg-blue-500 w-[120px] mb-2 p-2 rounded-sm text-white">
          {" "}
          Create{" "}
        </button>
      </Link>
      {loading == true &&  <div className="flex justify-center w-full h-full items-center"><Loading /></div> }
      {loading == false && categories.length == 0 && (
        <p> category not found </p>
      )}
      {categories && categories.length > 0 && (
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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

                <td className="px-6 py-4 ">
                  <div className="w-[90px] bg-lime-500 text-center rounded-full">
                    <span className="  text-white p-6   text-center">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/categories/edit/${category.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={``}
                    className="font-medium text-red-600 dark:text-red-500 ml-3 hover:underline"
                  >
                    Delete
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
