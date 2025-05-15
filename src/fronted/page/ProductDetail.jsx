import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl, userToken } from "../../component/htpds";
import { useParams } from "react-router-dom";
import Loading from "../../component/Loading";
import CustomerReviews from "../components/CustomerReview";
import { CartContext } from "../../context/Cart";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const { addToCart } = useContext(CartContext);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/getProductDetail/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        setProduct(null);
        setLoading(false);
        return;
      }

      const result = await response.json();
      setProduct(result.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // const fetchFavorites = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/favorites`, {
  //       headers: {
  //         Accept: "application/json",
  //
  //       },
  //       credentials: "include", // if using Sanctum
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       const ids = result.map((item) => item.product_id || item.id);
  //       setFavorites(ids);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching favorites:", error);
  //   }
  // };

  const handleAddToFavorites = async () => {
    try {
      const res = await fetch(`${apiUrl}/favorites/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        credentials: "include", // if using cookies
      });

      const result = await res.json();
      if (res.ok) {
        setFavorites((prev) => [...prev, params.id]);
      } else {
        console.error("Error adding to favorites:", result.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  return (
    <>
      <Navbar />
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        {loading && (
          <div className="flex justify-center w-full h-full items-center">
            <Loading />
          </div>
        )}
        {!loading && !product && (
          <p className="text-center">Product not found</p>
        )}
        {!loading && product && (
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full dark:hidden"
                  src={product.image}
                  alt={product.title}
                />
                <img
                  className="w-full hidden dark:block"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {product.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    $ {product.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            product.rating >= index + 1
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      ({product.rating ? product.rating.toFixed(1) : "0.0"})
                    </p>
                    {product.numReviews && (
                      <span className="text-sm font-medium text-gray-900 underline dark:text-white">
                        {product.numReviews} Reviews
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8 gap-4">
                  {favorites.includes(params.id) ? (
                    <button
                      disabled
                      className="py-2.5 px-5 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed"
                    >
                      ★ Favorited
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToFavorites}
                      className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                      </svg>
                      Add to favorites
                    </button>
                  )}

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {product.short_description}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <CustomerReviews productId={params.id} />
      <Footer />
    </>
  );
};

export default ProductDetail;
