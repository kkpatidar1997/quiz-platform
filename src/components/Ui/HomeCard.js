import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// This is our reusable component for the pages of our app //

export const HomeCard = ({ color, heading, path, delay, image, size }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center p-4 rounded-lg shadow-lg"
      style={{ backgroundColor: color }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <NavLink to={path} className="flex-1">
        <div>
          <h1 className="text-xl font-bold">{heading}</h1>
        </div>
      </NavLink>
      <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4">
        <img src={image} alt={heading} width={size ? size : "auto"} />
      </div>
    </motion.div>
  );
};
