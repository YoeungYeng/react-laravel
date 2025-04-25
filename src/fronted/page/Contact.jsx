import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Contact = () => {
  return (
    <>
      <Navbar />
      <div className=" p-10 bg-white">
        <h2 className="text-3xl font-bold mb-8">Send Us A Message</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>

          {/* Right Side - Contact Info and Map */}
          <div className="space-y-4">
            <div>
              <p className="font-medium">545, Street 11, Block F</p>
              <p>Dean Boulevard, Ohio</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <p>Info@alphad.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <p>+1 (308) 321 321</p>
            </div>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps?q=San+Diego,+CA,+USA&output=embed"
                width="100%"
                height="200"
                className="rounded shadow"
                allowFullScreen=""
                loading="lazy"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
