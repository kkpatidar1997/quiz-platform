import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName, playQuiz } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Selecting the displayed and created quizzes to be played //

const QuizTitle = ({ title, id }) => {
  const selectedQuiz = useRef();
  const dispatch = useDispatch();

  const handleSelected = () => {
    const selected = selectedQuiz.current.checked;

    // if there is no quiz selected then do nothing //
    if (!selected) {
      return;
    }

    // dispatching and choosing the quiz to be played //
    dispatch(playQuiz(id));
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="radio"
        ref={selectedQuiz}
        onClick={handleSelected}
        className="form-radio"
      />
      <p>{title}</p>
    </div>
  );
};

// This is all the logic of Playing quiz page //

export const PlayQuiz = () => {
  const name = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.reducer.quiz);

  // this handler will handle and route us to play the quiz which has been selected //
  const getNameHandler = () => {
    // if there is no name entered then do nothing except an alert //
    if (name.current.value === "") {
      alert("Please enter a name!");
      return;
    }

    // if there exists a quiz choose the selected one and let us play that quiz with the name entered and route to the play page //
    if (quiz.length > 0) {
      dispatch(getName(name.current.value));
      navigate("/quiz");
    }
  };

  // if there is no quiz then this empty message will be displayed //
  const emptyMsg = (
    <p className="text-red-500">
      There are Currently No Quizzes! Please create some new quizzes!
    </p>
  );

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Title of the Quiz</h1>
        </div>

        <div className="mb-4">
          <p>
            All quistion are compulsory!
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Your Name</label>
          <input
            type="text"
            ref={name}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          {quiz.length === 0
            ? emptyMsg
            : quiz
                .filter((el) => el.isActive === true)
                .map((el) => (
                  <QuizTitle title={el.title} key={el.id} id={el.id} />
                ))}
        </div>

        <div className="text-right">
          <button
            onClick={getNameHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
};
