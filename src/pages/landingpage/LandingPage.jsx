import React from "react";
import { useHistory } from "react-router-dom"; // For navigation
import "./LandingPage.css"; // Import specific styles

const LandingPage = () => {
  const history = useHistory(); // React Router History for navigation

  // Navigation handlers
  const handleLogin = () => history.push("/login");
  const handleSignup = () => history.push("/login"); // Navigate to Login for simplicity
  const handleGetStarted = () => history.push("/login");

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="landing-header">
        <h1>Blurry</h1>
        <nav>
          <button onClick={handleLogin} className="auth-button">Login</button>
          <button onClick={handleSignup} className="auth-button">Sign Up</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to Blurry</h2>
        <p>Your favorite place to share thoughts, moments, and connect with others in blurry ways!</p>
        <button onClick={handleGetStarted} className="hero-button">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Why Choose Blurry?</h3>
        <ul>
          <li>Real-Time Tweet Sharing</li>
          <li>Beautiful and Easy-to-Use Interface</li>
          <li>Privacy-Focused Community</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Blurry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
