import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "../../component/htpds";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const sliderRef = useRef(null);
  const [feature, setFeature] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // fetch feature data from api
  const fetchFeatureData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/getFeatureProduct`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      setLoading(false);
      setFeature(result.data);
    } catch (error) {
      console.error("Error fetching feature data:", error);
      setLoading(false);
    }
  };

  // call fetchFeatureData when component mounts
  React.useEffect(() => {
    fetchFeatureData();
  }, []);
  return (
    <section className="py-12 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">OUR NEW ARRIVALS</h2>
          <a href="#" className="text-sm underline">
            VIEW ALL PRODUCTS
          </a>
        </div>

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
            {loading == false && loading == true && (
              <div className="flex justify-center w-full h-full items-center">
                <Loading />
              </div>
            )}
            {loading == false && feature.length == 0 && (
              <p> category not found </p>
            )}
            {feature.length > 0 &&
              feature.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 snap-start bg-white p-4 rounded-lg shadow-md"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-500">$ {product.price}</p>
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
  );
};

export default NewArrivals;
