import React from "react";
import './LandingPage.css'; // Import specific styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="landing-header">
        <h1>Blurry</h1>
        <nav>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to Blurry</h2>
        <p>Your favorite place to share thoughts, moments, and connect with others in blurry ways!</p>
        <button onClick={() => window.location.href = "/signup"}>Get Started</button>
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
