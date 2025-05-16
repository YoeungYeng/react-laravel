import React, { useEffect, useState } from "react";
import Loading from "../component/Loading";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../component/htpds";

const Show = () => {
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/order`, {
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
        setOrders(result.data);
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
    <>
      <div className="relative w-full  shadow-md sm:rounded-lg ">
        
        {loading == true && (
          <div className="flex justify-center  items-center">
            <Loading />
          </div>
        )}
        {loading == false && order.length == 0 && (
          <p className="text-red-500 text-2xl flex justify-center items-center p-4">
            {" "}
            brands not found{" "}
          </p>
        )}
        {order && order.length > 0 && (
          <div className="overflow-x-auto mt-">
            <table className="min-w-full text-center​ text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Sub Title</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Date</th>
                  
                  
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Link className="hover:underline" to={`/orders/${order.id}`}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order.id}
                      </th>
                    </Link>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.email}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.created_at}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.status == "pending" && (
                          <span className="text-orange-300">
                            {order.status}
                          </span>
                        )}
                        {order.status == "shipped" && (
                          <span className="text-red-500">{order.status}</span>
                        )}
                        {order.status == "delivered" && (
                          <span className="text-green-500">{order.status}</span>
                        )}
                        {order.status == "canceled" && (
                          <span className="text-red-500">{order.status}</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/slides/${order.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="font-medium text-red-600 dark:text-red-500 ml-3 hover:underline"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Show;
