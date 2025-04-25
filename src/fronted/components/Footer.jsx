import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-neutral-700 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Team Section */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-3">Our Team</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">YOEUNG YENG</a></li>
              <li><a href="#" className="hover:text-white">PHEN REAKSMEY</a></li>
             
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-white"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-white"><FaLinkedin size={24} /></a>
            </div>
          </div>

          {/* Copyright Section */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-3">Copyright</h3>
            <p>&copy; {new Date().getFullYear()} Small Team❤️. All rights reserved.</p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>Designed with ❤️ by Small Team❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
