import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingpage/LandingPage";
import Home from "./pages/Home"; // Actual home page
import Login from "./pages/Login"; // Authentication page
import Dashboard from "./pages/Dashboard"; // User's dashboard page
import MailConfirmed from "./pages/MailConfirmed"; // Confirmation for mail

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
          <Route path="/" element={<Home />} /> {/* Use the actual Home component */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Use the actual Dashboard component */}
        </Route>

        {/* Redirect all other routes to landing */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
