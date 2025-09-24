import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import QuizPage from "./Pages/QuizPage";
import ExercisePage from "./Pages/ExercisePage";
import CommunityHub from "./Pages/CommunityHub";
import Mentors from "./Pages/Mentors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/mentors" element={<Mentors />} />
      </Routes>
    </Router>
  );
}

export default App;
