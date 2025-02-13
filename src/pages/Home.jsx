// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Handles user session loading
  const [showCreatePost, setShowCreatePost] = useState(false); // State for the "Create Post" form

  const navigate = useNavigate();

  // **Authenticate and Fetch User**
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, [navigate]);

  // **Handle Post Created: Callback to Refresh Feed**
  const handlePostCreated = () => {
    setShowCreatePost(false); // Close the create post form
  };

  // **Render loading indicator while session is checked**
  if (loadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Welcome message */}
      {user && (
        <div style={styles.welcome}>
          <h2>Welcome, {user.email}</h2>
        </div>
      )}

      {/* Create Post Button */}
      <div style={styles.createPostHeader}>
        <button
          style={styles.createPostButton}
          onClick={() => setShowCreatePost((prev) => !prev)}
        >
          {showCreatePost ? "Close" : "Create Post"}
        </button>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <div style={styles.createPostContainer}>
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}

      {/* Feed */}
      <Feed />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  welcome: {
    marginBottom: "20px",
  },
  createPostHeader: {
    textAlign: "center",
    marginBottom: "20px",
  },
  createPostButton: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  createPostContainer: {
    marginBottom: "20px",
  },
};

export default Home;
