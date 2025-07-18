import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <div className="w-full mx-auto relative">
      {/* Overlay text section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center text-white text-center px-4"
      >
        {/* Typewriter effect */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white"
        >
          <Typewriter
            words={["Welcome to E-Study"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.h1>

        {/* Subtitle with wait/fade animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="text-xl mb-6 text-white"
        >
          your collaborative learning space.
        </motion.p>
      </motion.div>

      {/* Overlay dark background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#597594] dark:bg-black opacity-60 z-10"></div>

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
