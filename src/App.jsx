// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingpage/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MailConfirmed from "./pages/MailConfirmed";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mail-confirmed" element={<MailConfirmed />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute redirectPath="/landing" />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect all other routes to landing */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
