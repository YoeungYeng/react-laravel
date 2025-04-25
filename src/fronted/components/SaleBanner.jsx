import React from "react";
import banner from "../../assets/wallpapersden.com_assassins-s-creed-shadows-4k-gaming_3840x2199.jpg"; 


const SaleBanner = () => {
  return (
    <section className="bg-gray-100 p-8 md:p-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg text-gray-600">10% off</p>
          <h2 className="text-4xl font-bold text-gray-900 my-2">NEW YEAR SALE</h2>
          <button className="bg-black text-white px-6 py-3 mt-4 text-sm uppercase">
            Shop Sale
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={banner}
            alt="iPhone Sale"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
