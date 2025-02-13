// src/components/TopBar.jsx
import React from "react";

const TopBar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: "60px",
    backgroundColor: "#f8f9fa", // Light gray background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "40px", // Adjust logo height
    width: "auto",
  },
};

export default TopBar;
