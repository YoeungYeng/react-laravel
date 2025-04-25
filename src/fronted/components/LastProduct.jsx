import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { u } from "framer-motion/client";
import { apiUrl } from "../../component/htpds";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";

const LastProduct = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // fetch data from api
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/getLastProduct`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    setLoading(false);
    setProducts(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="py-12 px-6 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Last Products</h2>
            <a href="#" className="text-sm underline">
              VIEW ALL PRODUCTS
            </a>
          </div>

          {loading == true && (
            <div className="flex justify-center w-full h-full items-center">
              <Loading />
            </div>
          )}
          {loading == false && products.length == 0 && (
            <p> category not found </p>
          )}
          {/* Slider Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Scrollable Products */}
            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
            >
              {products.length > 0 &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[200px] max-w-[200px] snap-center bg-white shadow-lg rounded-lg p-4"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                    </Link>
                    <h3 className="text-lg font-semibold mt-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-1">${product.price}</p>
                    <Link to={`/product/${product.id}`}>
                      <button className="text-blue-500 hover:underline focus:outline-none">
                        View Detail
                      </button>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LastProduct;
