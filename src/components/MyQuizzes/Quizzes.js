import React from "react";
import { useDispatch } from "react-redux";
import { toggleActive } from "../Redux/Actions";
import logo from "../../images/delete.png";

export const Quizzes = ({ title, serial, active, id, date, openModel }) => {
  const dispatch = useDispatch();

  const ActiveHandler = (id) => {
    dispatch(toggleActive(id));
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <div className="w-10 text-center">{serial}</div>
      <div className="flex-1 font-semibold">{title.toUpperCase()}</div>
      <div className="flex items-center">
        <p className="mr-2">{active ? "Active" : "Inactive"}</p>
        <button
          className={`w-10 h-6 flex items-center bg-${active ? "green-500" : "gray-500"} rounded-full p-1 transition-all duration-300`}
          onClick={() => ActiveHandler(id)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform ${active ? "translate-x-4" : "translate-x-0"}`}
          ></div>
        </button>
      </div>
      <div className="w-48 text-center">
        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
      </div>
      <div className="w-10 text-center">
        <img
          src={logo}
          alt="Delete"
          className="w-10 cursor-pointer"
          onClick={() => openModel(id)}
        />
      </div>
    </div>
  );
};
