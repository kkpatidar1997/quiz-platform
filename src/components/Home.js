import React from "react";
import { HomeCard } from "./Ui/HomeCard";
import illus1 from "../images/1.jpg";
import illus2 from "../images/2.png";
// import illus3 from "../images/3.jpg";


// This is our homepage which will route us to the necessary pages //

export const Home = () => {
  return (
    // <div className="flex flex-row  	align-items: center 	align-content: center   ">

    <div class="flex  justify-center items-center   ">
      <HomeCard
        color="white"
        heading="Create New Quiz"
        path="create-new"
        delay={0.15}
        image={illus1}
        size="300px"
      />
      <HomeCard
        color="white"
        heading="My Quizzes"
        path="my-quizzes"
        delay={0.25}
        image={illus2}
        size="300px"
      />
    </div>
  );
};
