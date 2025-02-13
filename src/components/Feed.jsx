// src/components/Feed.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the database
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, content, like_count, comment_count, created_at,
        profiles(username, profile_picture)
      `
      )
      .order("created_at", { ascending: false }); // Fetch latest posts first

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data || []); // Store the posts in state
    }
    setLoading(false);
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.feed}>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />) // Pass each post to the Post component
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

const styles = {
  feed: {
    marginTop: "20px",
  },
};

export default Feed;
