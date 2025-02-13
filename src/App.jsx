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
        <Route path="/landing" element={<div>Landing Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/mail-confirmed" element={<div>Mail Confirmed Page</div>} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute redirectPath="/landing" />}>
          <Route path="/" element={<div>Home Page Placeholder</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page Placeholder</div>} />
        </Route>

        {/* Redirect all other routes to landing */}
        <Route path="*" element={<div>404: Redirected to Landing</div>} />
      </Routes>
    </Router>
  );
};

export default App;
