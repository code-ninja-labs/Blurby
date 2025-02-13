// src/pages/landingpage/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory in v6+
import "./LandingPage.css"; // Import specific styles

const LandingPage = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Blurry</h1>
        <nav>
          {/* Navigates to login when the button is clicked */}
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/login")}>Sign Up</button>
        </nav>
      </header>
      <section className="hero-section">
        <h2>A Modern Platform for Everyone</h2>
        <p>Secure, fast, and designed with privacy in mind.</p>
        {/* Navigates to login when clicking Get Started */}
        <button onClick={() => navigate("/login")}>Get Started</button>
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Blurry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
