import React from "react";
import icon from "../../images/delete.png";

// This component returns the answers created for a question with necessary actions //

export const AnswerCard = ({ text, id, correct, onDeleteHandler }) => {
  console.log(correct);
  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <p>{text}</p>
        <img
          src={icon}
          alt="Delete"
          width="20px"
          className="cursor-pointer"
          onClick={() => onDeleteHandler(id)}
        />
      </div>
      <div
        className={`flex items-center p-2 rounded-md ${correct ? "bg-green-500" : "bg-gray-200"}`}
      >
        <input
          type="checkbox"
          className="form-checkbox mr-2"
          checked={correct}
          readOnly
        />
        <p>correct</p>
      </div>
    </div>
  );
};
