// src/components/BottomNavBar.jsx
import React from "react";

const BottomNavBar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navItems}>
        <li style={styles.navItem}>
          <img src="/icons/home.png" alt="Home" style={styles.icon} />
          <span>Home</span>
        </li>
        <li style={styles.navItem}>
          <img src="/icons/search.png" alt="Search" style={styles.icon} />
          <span>Search</span>
        </li>
        <li style={styles.navItem}>
          <img src="/icons/profile.png" alt="Profile" style={styles.icon} />
          <span>Profile</span>
        </li>
        <li style={styles.navItem}>
          <img src="/icons/notification.png" alt="Notifications" style={styles.icon} />
          <span>Notification</span>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#f8f9fa", // Light gray
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #ddd",
  },
  navItems: {
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
  icon: {
    height: "24px", // Adjust icon size
    width: "24px",
    marginBottom: "4px",
  },
};

export default BottomNavBar;
