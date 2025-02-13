// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // Updated navigation hook for v6+
import CreatePost from "../components/CreatePost";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [posts, setPosts] = useState([]); // State for posts
  const [loadingPosts, setLoadingPosts] = useState(true); // Loading state for feed
  const [showCreatePost, setShowCreatePost] = useState(false); // Display form to create post
  const navigate = useNavigate();

  // **1. Authenticate and fetch user**
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

  // **2. Fetch posts from the database**
  const fetchPosts = async () => {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, content, like_count, comment_count, created_at,
        profiles(username, profile_picture)
      `
      )
      .order("created_at", { ascending: false }); // Latest posts first

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data || []); // Store posts in state or empty array
    }
    setLoadingPosts(false);
  };

  // **Fetch posts on component mount**
  useEffect(() => {
    fetchPosts();
  }, []);

  // **3. Handle post creation success to refresh feed**
  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts after a new one is created
    setShowCreatePost(false); // Close the create post form
  };

  // **4. Render loading screen, user data, and feed**
  if (loadingUser) {
    return <div>Loading...</div>; // Show while user session is being confirmed
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
      <div style={styles.feed}>
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              <div style={styles.profile}>
                <img
                  src={post.profiles?.profile_picture || "/default-avatar.png"}
                  alt="User Logo"
                  style={styles.profilePicture}
                />
                <span>{post.profiles?.username || "Unknown User"}</span>
              </div>
              <p style={styles.content}>{post.content}</p>
              <div style={styles.meta}>
                <span>Likes: {post.like_count}</span>
                <span>Comments: {post.comment_count}</span>
                <span>{new Date(post.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

// **CSS Styles**
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
  feed: {
    marginTop: "20px",
  },
  post: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  profilePicture: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  content: {
    fontSize: "16px",
    margin: "10px 0",
  },
  meta: {
    fontSize: "14px",
    color: "#555",
  },
};

export default Home;
                
