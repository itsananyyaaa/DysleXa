import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import QuizPage from "./Pages/QuizPage";
import ExercisePage from "./Pages/ExercisePage";
import CommunityHub from "./Pages/communityhub";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/community" element={<CommunityHub />} />
      </Routes>
    </Router>
  );
}

export default App;
