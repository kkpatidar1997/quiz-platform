import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, resetQuiz } from "../Redux/Actions";
import { QuizCard } from "./QuizCard";
import { motion } from "framer-motion";
import img from "../../images/congo.png";
import { useNavigate } from "react-router-dom";

// this is the logic of the final results modal to be shown after the end of the quiz //

export const ResultModel = ({ name }) => {
  const results = useSelector((state) => state.reducer.answers);
  const mapped = results.map((el) => el.isCorrect);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // this handler will reset our state and route us to the homepage by dispatching the reset action //
  const resetQuizHandler = () => {
    dispatch(resetQuiz());
    navigate("/");
  };

  return (
     <div className="flex items-center justify-center h-full">
  
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="mb-4">
          <img src={img} alt="Congratulations" className="w-64 mx-auto" />
          <p className="text-xl font-bold">Hi! {name}</p>
          <p className="mt-2">
            Your Score is {mapped.filter((el) => el === true).length} out of {mapped.length}
          </p>
        </div>
        <div>
          <button
            onClick={resetQuizHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Okay
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// this is all the logic of our final results page //

export const Quiz = () => {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState({});

  const quiz = useSelector((state) => state.reducer.playQuiz).questions;
  const name = useSelector((state) => state.reducer.name);

  const dispatch = useDispatch();

  // this handler dispatches our selected answers and increments the count taking us to the next questions //
  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer));

    if (count >= quiz.length - 1) {
      setShowModal(true);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  // this handler will change our selected answers if we select again and set them in the state //
  const getAnswerHandler = (answer, correct, id) => {
    const Answer = {
      answer: answer,
      isCorrect: correct,
      id: id,
    };
    setFinalAnswer(Answer);
  };

  // these are the states and data which is to be shown and played //
  const question = quiz[count].question;
  const answers = quiz[count].answers;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <div className="mb-4">
          <p className="text-lg font-bold">Hi! {name}</p>
        </div>
        <QuizCard
          nextQuestionHandler={nextQuestionHandler}
          count={count}
          question={question}
          answers={answers}
          getAnswerHandler={getAnswerHandler}
          length={quiz.length}
          selectedId={finalAnswer.id ? finalAnswer.id : ""}
        />
      </div>
      {showModal && <ResultModel name={name} />}
    </div>
  );
};
