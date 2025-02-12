import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div>Login Page Placeholder</div>} />
        <Route path="/signup" element={<div>Sign Up Page Placeholder</div>} />
      </Routes>
    </Router>
  );
};

export default App;
