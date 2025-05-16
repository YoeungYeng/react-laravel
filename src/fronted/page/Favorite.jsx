import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../../context/Cart";
import { apiUrl, userToken } from "../../component/htpds";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${apiUrl}/getAllfavorites/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      });
      const data = await res.json();
      setProducts(data.favorites || []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-9 min-h-screen ">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Favorite is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-md shadow-md overflow-hidden"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600">${product.price}</span>
                    {product.oldPrice && (
                      <span className="ml-2 text-gray-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      <button className="text-blue-500 hover:underline focus:outline-none">
                        View Detail
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorite;
