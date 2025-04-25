import React, { useEffect, useState } from "react";
import { adminToken, apiUrl } from "../component/htpds";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Show = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoaing] = useState(false);
  const fetchBranches = async () => {
    try {
      setLoaing(true)
      const response = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      
      const result = await response.json();
      console.log("Result:", result);
      setLoaing(false)
      if (result.status === 200) {
        setBrands(result.data);
        console.log("Categories:", result.data);
      } else {
        console.log("Fetch Categories Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);
  return (
    <div className="relative w-full h-scree  shadow-md sm:rounded-lg ">
      <Link to={`/brands/create`} className="mb-4 flex justify-end items-center">
              <button className="bg-blue-500 w-[120px] mt-4 p-2 rounded-sm text-white mb-4">
                {" "}
                Create{" "}
              </button>
            </Link>
      {loading == true && (
        <div className="flex justify-center  items-center">
          <Loading />
        </div>
      )}
      {loading == false && brands.length == 0 && <p className="text-red-500 text-2xl flex justify-center items-center p-4"> brands not found </p>}
      {brands && brands.length > 0 && (
        <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
           {
            brands.map((brand) =>(
              <tr
                key={brand.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {brand.name}
                </th>

                <td className="px-6 py-4 ">
                  <div className="w-[50px] bg-lime-500 text-center rounded-full">
                  <span className="  text-white p-2   text-center">
                    {brand.status}
                  </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/brands/edit/${brand.id}`}
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
           }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Show;
