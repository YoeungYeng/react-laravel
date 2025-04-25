import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import banner from "../../assets/wallpapersden.com_assassins-s-creed-shadows-4k-gaming_3840x2199.jpg";
import banner2 from "../../assets/ninja.jpg";
import banner3 from "../../assets/banner.jpg";
import { b } from "framer-motion/client";


const slides = [
  {
    id: 1,
    title: "Welcome to Our Shop",
    description: "Discover amazing products and unbeatable prices.",
    image: banner,
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out the latest trends and collections.",
    image: banner2,
  },
  {
    id: 3,
    title: "Stay Connected",
    description: "We’re here to help you find what you need.",
    image: banner3,
  },
];
const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };
  return (
    <>
      <div className="relative w-full h-[60vh] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 w-full h-full bg-cover bg-center ${
              index === current ? "z-10" : "z-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="w-full h-full bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
