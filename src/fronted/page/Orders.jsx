import React, { useEffect, useState } from "react";
import SideLefe from "../components/SideLefe";
import Loading from "../../component/Loading";
import { apiUrl, userToken } from "../../component/htpds";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Orders = () => {
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/getOrder`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
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
      fetchOrder();
    }, []);
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
        <div className="flex items-center justify-center mb-4 rounded-sm">
            {/* table show order */}
      <div className="relative w-full  shadow-md sm:rounded-lg ">
        {loading == true && (
          <div className="flex justify-center  items-center">
            <Loading />
          </div>
        )}
        {loading == false && order.length == 0 && (
          <p className="text-red-500 text-2xl flex justify-center items-center p-4">
            {" "}
            order not found{" "}
          </p>
        )}
        {order && order.length > 0 && (
          <div className="overflow-x-auto mt-">
            <table className="min-w-full text-center​ text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Payment</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Link
                      className="hover:underline"
                      to={`/orders/${order.id}`}
                    >
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
                        {order.grand_total}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.created_at}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {order.payment_status == "paid" ? (
                          <span className="text-green-500">
                            {order.payment_status}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            {order.payment_status}
                          </span>
                        )}
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
                        to={`/brands/edit/${order.id}`}
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
        </div>
      </div></div>
    </>
  );
};

export default Orders;
