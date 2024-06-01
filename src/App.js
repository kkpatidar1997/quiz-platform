import "./App.css";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { MyQuizzes } from "./components/MyQuizzes/MyQuizzes";
import { CreateNew } from "./components/CreateNew/CreateNew";
import { PlayQuiz } from "./components/PlayQuiz/PlayQuiz";
import { Quiz } from "./components/PlayQuiz/Quiz";


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/PlayQuiz" element={<PlayQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
