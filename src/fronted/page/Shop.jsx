import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl } from "../../component/htpds";
import { Link } from "react-router-dom";
import Loading from "../../component/Loading";
import { CartContext } from "../../context/Cart";

// import { get } from "react-hook-form";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [catCheck, setCatCheck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    addToCart(product);
  };
 

  // category filter
  const handleCategoryChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatCheck((prev) => [...prev, value]);
    } else {
      setCatCheck(catCheck.filter((id) => id !== value));
    }
  };

  const handleBrandChange = (e) =>{
    const { checked, value } = e.target;
    if (checked) {
      setCatCheck((prev) => [...prev, value]);
    } else {
      setCatCheck(catCheck.filter((id) => id !== value));
    }
  }
  // Function to handle sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // get all products from the api
  const fetchProducts = async () => {
    setLoading(true);
    console.log(catCheck);
    const params = new URLSearchParams();

    // Add category filter if catCheck has values
    if (catCheck.length > 0) {
      catCheck.forEach((categoryId) => {
        params.append("category", categoryId);
      });
    }

    let url = `${apiUrl}/getAllProduct`;
    const queryString = params.toString();

    if (queryString) {
      url += `?${queryString}`;
    }

    console.log("Fetching URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return; // Or throw an error
    }

    const data = await res.json();
    console.log("data", data);
    setLoading(false);
    setProducts(data.data);
  };
  // ------------- category --------------
  const fetchCategory = async () => {
    const res = await fetch(`${apiUrl}/getCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    setCategories(data.data);
  };
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/getBrands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    setBrands(data.data);
  };

  useEffect(() => {
    fetchCategory();
    fetchBrands();
    fetchProducts();
  }, [catCheck]);
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar (Filters) */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-md shadow-md">
                {/* Search Bar */}
                {/* <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div> */}

                {/* Filter by Color */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Filter by Category
                  </h3>
                  <div className="space-y-2">
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <div key={category.id}>
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox text-green"
                              value={category.id}
                              onClick={handleCategoryChange}
                            />
                            <span className="ml-2">{category.name}</span>
                          </label>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Filter by brand */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Filter by Brands
                  </h3>
                  <div className="space-y-2">
                    {brands.length > 0 &&
                      brands.map((brand) => (
                        <div>
                          <label
                            key={brand.id}
                            className="inline-flex items-center"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              value={brand.id}
                              onClick={handleBrandChange}
                            />
                            <span className="ml-2"> {brand.name} </span>
                          </label>
                        </div>
                      ))}

                    {/* ... other sizes */}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                {/* Search Bar (can be duplicated here or just above the grid) */}
                <div className="hidden md:block">
                  {/* Search Bar Component */}
                </div>
                {/* Sort By */}
                <div>
                  <label htmlFor="sort" className="mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="">Default</option>
                    <option value="price-low-to-high">
                      Price (Low to High)
                    </option>
                    <option value="price-high-to-low">
                      Price (High to Low)
                    </option>
                    {/* Add other sorting options */}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading == true && (
                  <div className="flex justify-center  items-center">
                    <Loading />
                  </div>
                )}
                {loading == false && categories.length == 0 && (
                  <p> category not found </p>
                )}
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
                      <h3 className="text-lg font-semibold mb-2">
                        {product.title}
                      </h3>
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
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
};

export default Shop;
