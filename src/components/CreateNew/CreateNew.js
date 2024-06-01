import React, { useState } from "react";
import { CreateNewForm } from "./CreateNewForm";
import { motion } from "framer-motion";

// This is the starting of our creating quiz app which returns a modal //

const CreateNewModel = ({ handelModel }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handelModel}
        >
          MCQ (Single Correct)
        </button>
      </motion.div>
    </div>
  );
};

export const CreateNew = () => {
  const [ShowModel, setShowModel] = useState(true);

  const handelModel = () => {
    setShowModel(false);
  };

  return (
    <div>
      {ShowModel ? (
        <CreateNewModel handelModel={handelModel} />
      ) : (
        <CreateNewForm />
      )}
    </div>
  );
};
