import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "./htpds";

import Loading from "./Loading";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const fetchLogo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/settings`, {
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
    fetchLogo();
  }, []);

  return (
    <>
      <footer className="dark:bg-slate-900 w-full flex justify-center items-center shadow-sm  mt-4 rounded-sm">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to={"/"}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse">
                  <Loading />
                </div>
              ) : (
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={product.logo} className="h-8" alt="Flowbite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    {product.title}
                  </span>
                </div>
              )}
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to={""} className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to={product?.link} className="hover:underline text-red-500">
              {product?.title}
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
