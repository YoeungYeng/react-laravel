import React from "react";
import Navbar from "../components/Navbar";
import banner1 from "../../assets/6ca7cb21-32bf-4d4f-9182-63e0c3864692.jpeg";
import banner2 from "../../assets/aaaa820e-7cdc-4250-aaa3-812eb1e7daa9.jpeg";
import banner3 from "../../assets/ninja.jpg";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-700 leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page
              when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted
              to God, and by this our present charter confirmed for us and our heirs forever that the
              English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we
              will that it be thus observed; which is apparent from...
            </p>
          </div>
          <div>
            <img
              src={banner1} // Replace with your actual image URL
              alt="About Us Team"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        <hr className="my-12 border-t border-gray-300" />

        {/* Our Story Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            It is a long established fact that a reader will be distracted by the readable content of a page
            when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted
            to God, and by this our present charter confirmed for us and our heirs forever that the
            English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we...
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <img
                src={banner2} // Replace with Alexa's image URL
                alt="Alexa"
                className="rounded-full w-24 h-24 object-cover mx-auto mb-2 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">Alexa</h3>
            </div>
            <div className="text-center">
              <img
                src={banner3} // Replace with Olivia's image URL
                alt="Olivia"
                className="rounded-full w-24 h-24 object-cover mx-auto mb-2 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">Olivia</h3>
            </div>
            <div className="text-center">
              <img
                src={banner1}// Replace with Liam's image URL
                alt="Liam"
                className="rounded-full w-24 h-24 object-cover mx-auto mb-2 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">Liam</h3>
            </div>
            <div className="text-center">
              <img
                src={banner3} // Replace with Elijah's image URL
                alt="Elijah"
                className="rounded-full w-24 h-24 object-cover mx-auto mb-2 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">Elijah</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
