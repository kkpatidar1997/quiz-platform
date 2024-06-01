import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Quizzes } from "./Quizzes";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz } from "../Redux/Actions";
import { motion } from "framer-motion";

const DeleteModel = ({ closeModel, id }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = (id) => {
    dispatch(deleteQuiz(id));
    closeModel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h2 className="text-xl font-bold mb-2">Are you sure you want to delete?</h2>
          <p className="mb-4">
            Deleting this will result in losing the file permanently and it is not recoverable.
          </p>
          <div className="flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
              onClick={() => onDeleteHandler(id)}
            >
              Yes
            </button>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" 
              onClick={closeModel}
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const MyQuizzes = () => {
  const [model, setModel] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const quizzes = useSelector((state) => state.reducer.quiz);

  const openModel = (id) => {
    setDeleteId(id);
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };

  return (
    <>
      {model && <DeleteModel closeModel={closeModel} id={deleteId} />}
      <motion.div
        className="container mx-auto p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Quizzes</h1>
            <NavLink to="/create-new">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Create New Quiz
              </button>
            </NavLink>
          </div>

          <div>
            {quizzes.length === 0 ? (
              <p className="text-red-500">Currently there are no quizzes!</p>
            ) : (
              quizzes.map((el, i) => (
                <Quizzes
                  key={el.id}
                  title={el.title}
                  id={el.id}
                  active={el.isActive}
                  date={el.createdOn}
                  serial={i + 1}
                  openModel={openModel}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
