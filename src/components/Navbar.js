import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/quiz-logo2.jpg";
 

// This component returns our navbar ultimately //

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex-shrink-0">
        <NavLink to="/">
          <img src={logo} alt="Logo" width="120px" />
        </NavLink>
      </div>

      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/my-quizzes"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-white"
          }
        >
          My Quizzes
        </NavLink>
        <NavLink
          to="/play-quiz"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-white"
          }
        >
          Play
        </NavLink>
      </div>
    </div>
  );
};
