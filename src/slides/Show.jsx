import React, { use, useEffect, useState } from "react";
import Loading from "../component/Loading";
import { Link, useNavigate } from "react-router-dom";
import { adminToken, apiUrl } from "../component/htpds";
import { toast } from "react-toastify";

const Show = () => {
  const [slide, setSlide] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const fetchSlide = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/slides`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();
      console.log("Result:", result.data);

      if (result.status === 200) {
        setSlide(result.data);
      }
    } catch (error) {
      console.error("Fetch Slides Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlide();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/slides/${id}`, {
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

      toast.success("Slide deleted successfully");
      navigator("/slides"); // Redirect to slide list page
      
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting slide: " + error.message);
    }
  };

  return (
    <div className="relative w-full shadow-md sm:rounded-lg">
      <div className="flex justify-end mb-4">
        <Link to="/slides/create" className="inline-block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create
          </button>
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}

      {!loading && slide.length === 0 && (
        <p className="text-red-500 text-2xl flex justify-center items-center p-4">
          Slide not found
        </p>
      )}

      {!loading && slide.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
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
              {slide.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white p-2 block">{item.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white p-2 block">
                      {item.subtitle}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Slide"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white p-2 block">
                      {item.created_at}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/slides/${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link className="font-medium text-red-600 dark:text-red-500 ml-3 hover:underline">
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Show;
