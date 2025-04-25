import React, { useEffect, useState } from "react";
import { adminToken, apiUrl } from "../component/htpds";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Show = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/products`, {
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
        setProduct(result.data);
        console.log("Categories:", result.data);
      } else {
        console.log("Fetch Categories Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Link to={`/products/create`} className="inline-block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Product
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-6">
            <Loading />
          </div>
        ) : product.length === 0 ? (
          <p className="text-center p-6 text-gray-600">
            No products found{" "}
            <span role="img" aria-label="sad">
              😢
            </span>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    QTY
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:table-cell">
                    Short Description
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:table-cell">
                    Description
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider md:table-cell">
                    Category ID
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider md:table-cell">
                    Brand ID
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider md:table-cell">
                    Status
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {prod.title}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {prod.price}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {prod.quantity}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-800 sm:table-cell">
                      <div className="max-w-xs overflow-hidden  text-ellipsis">
                        <pre className="text-sm text-gray-800 w-[200px]">
                          {prod.short_description}
                        </pre>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-800 sm:table-cell">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        <pre className="text-sm text-gray-800 w-[200px]">
                          {prod.description}
                        </pre>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {prod.image ? (
                        <img
                          src={prod.image}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800 md:table-cell">
                      {prod.category_id}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800 md:table-cell">
                      {prod.brand_id}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/products/edit/${prod.id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          // Implement your delete functionality here
                          console.log(`Delete product with ID: ${prod.id}`);
                          // You would typically call an API to delete the product
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Show;
