import React from "react";

// This component will display our answers to the user, with a handler function to select the answer and lift the state up.

const AnswerCard = ({ id, answer, correct, getAnswerHandler, selectedId }) => {
  const onClickHandler = () => {
    getAnswerHandler(answer, correct, id);
  };

  return (
    <div
      className={`p-4 mb-2 border rounded-lg cursor-pointer ${
        selectedId === id ? "bg-green-500" : "bg-white"
      }`}
      onClick={onClickHandler}
    >
      <span
        className={`inline-block w-4 h-4 mr-2 rounded-full ${
          selectedId === id ? "bg-blue-500" : "bg-gray-200"
        }`}
      ></span>
      <p>{answer}</p>
    </div>
  );
};

// This is all the logic of playing and selecting the answers of the quiz. It has all the props and states we need.

export const QuizCard = ({
  count,
  nextQuestionHandler,
  question,
  answers,
  getAnswerHandler,
  length,
  selectedId,
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <div className="mb-4 font-semibold text-lg">
        <div className="text-sm mb-2">Please select only one answer!</div>
        {count + 1}. {question}
      </div>

      <div className="mb-4">
        {answers.map((el) => (
          <AnswerCard
            key={el.id}
            id={el.id}
            correct={el.correct}
            answer={el.answer}
            getAnswerHandler={getAnswerHandler}
            selectedId={selectedId}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          Question {count + 1}/{length}
        </div>
        <button
          onClick={nextQuestionHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};
