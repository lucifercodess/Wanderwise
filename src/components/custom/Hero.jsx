import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 bg-gray-50 text-gray-800 min-h-screen px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="font-bold text-4xl md:text-5xl text-center leading-tight"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        AI-powered trips tailored to your{" "}
        <span className="text-gray-600 underline decoration-wavy">
          wanderlust dreams.
        </span>
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-center text-gray-600 max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Discover a smarter way to plan your travels. Our AI-powered platform
        ensures stress-free adventures, personalized itineraries, and
        unforgettable experiences—all with ease.
      </motion.p>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link to={"/create-trip"}>
        <Button className="bg-gray-800 text-white hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium shadow-md transition-all">
          Get Started - It’s Free
        </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
