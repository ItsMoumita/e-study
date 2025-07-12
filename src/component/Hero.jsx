import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className="w-full mx-auto relative">
      {/* Overlay text section */}
      <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Study</h1>
        <p className="text-xl mb-6">Study - Education HTML5 Template</p>
        
    

    
      </div>

      {/* Overlay dark background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

      {/* Carousel container */}
      <div className="relative z-0 w-full h-[80vh]">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={2500}
          showStatus={false}
          dynamicHeight={false}
          className="shadow-lg overflow-hidden"
        >
          {[
            "https://i.ibb.co/gbkCsdsT/smiling-woman-with-afro-posing-pink-sweater-273609-31988.jpg",
            "https://i.ibb.co/kgC0WDdj/young-woman-attend-courses-girl-student-studying-holding-notebooks-showing-thumb-up-approval-recomme.jpg",
            "https://i.ibb.co/TxtVQbfF/Thrive-During-Finals.jpg",
            "https://i.ibb.co/JR09zfVg/Getty-Images-1072191138.jpg",
            "https://i.ibb.co/9HWzBQ5g/360-F-422965230-Wny-Q93-M3i-Tjgp-S0-Ai-Wlh-Bo-L3d-Gq-GC0-IZ.jpg",
          ].map((img, idx) => (
            <div key={idx} className="h-[80vh]">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
