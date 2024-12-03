import React, { useState, useEffect, useRef } from "react";

const Slider = () => {
  const images = [
    "images/s2.png",
    "images/s3.png",
    "images/s2.png",
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef();

  // Automatically advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    sliderRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!sliderRef.current) return;
    const touchEnd = e.touches[0].clientX;
    if (sliderRef.current - touchEnd > 50) {
      nextSlide();
      sliderRef.current = null;
    } else if (sliderRef.current - touchEnd < -50) {
      prevSlide();
      sliderRef.current = null;
    }
  };

  return (
    <div className="slider grid-rows-1">
        <div className="grid-cols-1">
          <div className="relative w-full h-[600px] mx-auto overflow-hidden">
            {/* Slider */}
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full object-cover"
                />
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              ◀
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              ▶
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex
                      ? "bg-gray-800"
                      : "bg-gray-400 hover:bg-gray-600"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Slider;
