import React from "react";
import { FormMain } from "./FormMain";
import { motion } from "framer-motion";

export const CreateNewForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create New Form
          </motion.h1>
        </div>

        <FormMain />
      </div>
    </div>
  );
};
