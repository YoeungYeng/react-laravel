import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../../component/htpds";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${apiUrl}/account/getslides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      console.log("Result:", result.data);
      if (result.status === 200) {
        setSlides(result.data);
      } else {
        console.error("Failed to fetch slides:", result.message);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(timer);
  }, [slides]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full h-[70vh]   overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0  w-full h-full bg-cover bg-center ${
            index === current ? "z-10" : "z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})`, padding: "0 10px" }}
        >
          <div className="w-full p-5 h-full bg-black/40 flex items-center justify-center">
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
  );
};

export default Hero;
