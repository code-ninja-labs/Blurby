// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.description}>
        Welcome to your dashboard! Here, you can view your statistics, manage your account, and explore more features.
      </p>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => alert("Viewing Analytics!")}>
          View Analytics
        </button>
        <button style={styles.button} onClick={() => alert("Account Settings!")}>
          Account Settings
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "20px",
  },
  actions: {
    marginTop: "20px",
  },
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    background: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
