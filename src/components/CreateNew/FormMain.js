import React, { useState, useRef, useEffect } from "react";
import { AnswerCard } from "../Ui/AnswerCard";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addQuiz } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";

export const FormMain = () => {
  const [count, setCount] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [added, setAdded] = useState(false);
  const [answerLength, setAnswerLength] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (added) {
        setAdded(false);
      }
    }, 1000);

    const timeOut2 = setTimeout(() => {
      if (answerLength) {
        setAnswerLength(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
    };
  }, [added, answerLength]);

  const answerRef = useRef();
  const correctRef = useRef();
  const questionRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addOptionHandler = (e) => {
    e.preventDefault();

    if (answerRef.current.value === "") {
      return;
    }

    if (answers.length >= 4) {
      setAnswers((prev) => [...prev]);
    } else {
      const Answer = {
        answer: answerRef.current.value.toUpperCase(),
        correct: correctRef.current.checked,
        id: Math.random() * 10,
      };

      setAnswers((prev) => [...prev, Answer]);
    }

    answerRef.current.value = "";
    correctRef.current.checked = false;
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();

    if (questionRef.current.value === "" || answers.length === 0) {
      questionRef.current.value = "";
      return;
    }

    if (answers.length > 2) {
      const Question = {
        question: questionRef.current.value,
        answers: answers,
        id: count,
      };

      setCount((prev) => prev + 1);
      setQuestion((prev) => [...prev, Question]);
      setAnswers([]);
      setAdded(true);
      questionRef.current.value = "";
    } else {
      setAnswerLength(true);
    }
  };

  const onDeleteHandler = (id) => {
    const filteredArr = answers.filter((el) => el.id !== id);
    setAnswers(filteredArr);
  };

  const onSaveHandler = (e) => {
    e.preventDefault();
    const titleValue = titleRef.current.value;
    const descValue = descriptionRef.current.value;

    if (titleValue === "" || question.length <= 0) {
      return;
    }

    const Quiz = {
      title: titleValue,
      description: descValue,
      questions: question,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(Quiz));

    setCount(1);

    titleRef.current.value = "";

    navigate("/play-quiz");
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="space-y-6">
        <form>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Add Title"
              name="title"
              className="w-full p-2 border rounded"
              ref={titleRef}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Add Description"
              ref={descriptionRef}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-right font-semibold">
              Question {count}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              ref={questionRef}
            />
            {added && (
              <motion.p
                className="text-green-500"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Question has been added!
              </motion.p>
            )}
            {answerLength && (
              <motion.p
                className="text-red-500"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                There should be more than 2 options!
              </motion.p>
            )}
          </div>

          <div className="space-y-4">
            {answers.map((el, i) => (
              <AnswerCard
                text={el.answer}
                id={el.id}
                key={i}
                correct={el.correct}
                onDeleteHandler={onDeleteHandler}
              />
            ))}
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              placeholder="Answer"
              ref={answerRef}
            />
            <div className="flex items-center space-x-2">
              <input type="checkbox" ref={correctRef} />
              <label className="text-sm">Correct</label>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={addOptionHandler}
            >
              +
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={addQuestionHandler}
        >
          Add Question
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onSaveHandler}
        >
          Save
        </button>
      </div>
    </motion.div>
  );
};
