// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // updated from useHistory
import TopBar from "../components/TopBar";
import BottomNavBar from "../components/BottomNavBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      // Check for an active session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user); // Set the authenticated user
      } else {
        navigate("/login"); // Redirect to login if no session
      }
      setLoading(false); // Stop loading after the check
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redirect to login on logout
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading screen while session is being checked
  }

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div style={styles.content}>
        {user ? (
          <div>
            <h1>Welcome, {user.email}</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
  },
  content: {
    flex: 1, // Takes the rest of the vertical space
    padding: "20px",
    marginTop: "60px", // Offset for top bar
    marginBottom: "60px", // Offset for bottom nav bar
  },
};

export default Home;
