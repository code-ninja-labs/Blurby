// src/pages/MailConfirmed.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const MailConfirmed = () => {
  const navigate = useNavigate(); // Use this for navigation to another page

  const handleGoToDashboard = () => {
    navigate("/dashboard"); // Change this to any other route if needed
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Email Confirmation Successful!</h1>
      <p style={styles.description}>
        Your email has been successfully confirmed. You can now access all the features of your account.
      </p>

      <button style={styles.button} onClick={handleGoToDashboard}>
        Go to Dashboard
      </button>
    </div>
  );
};

// Inline styles for simplicity; replace with CSS or styled-components if needed
const styles = {
  container: {
    textAlign: "center",
    margin: "50px auto",
    maxWidth: "600px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#f8f9fa",
  },
  title: {
    fontSize: "2rem",
    color: "#28a745",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MailConfirmed;
