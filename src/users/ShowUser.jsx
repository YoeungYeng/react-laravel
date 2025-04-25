import React, { useEffect, useState } from "react";
import { apiUrl, userToken } from "../component/htpds";
import Loading from "../component/Loading";
import { Link } from "react-router-dom";

const ShowUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/user`, {
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
        setUser(result.data);
        console.log("Categories:", result.data);
      } else {
        console.log("Fetch Categories Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="relative w-full  shadow-md sm:rounded-lg ">
        {loading == true && (
          <div className="flex justify-center  items-center">
            <Loading />
          </div>
        )}
        {loading == false && user.length == 0 && (
          <p className="text-red-500 text-2xl flex justify-center items-center p-4">
            {" "}
            brands not found{" "}
          </p>
        )}
        {user && user.length > 0 && (
          <div className="overflow-x-auto mt-">
            <table className="min-w-full text-center​ text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Link className="hover:underline" to={`/orders/${user.id}`}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.id}
                      </th>
                    </Link>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {user.email}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="text-white p-2 block text-center">
                        {user.created_at}
                      </span>
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

export default ShowUser;
