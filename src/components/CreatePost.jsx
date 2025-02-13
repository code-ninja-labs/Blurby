import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const createPost = async () => {
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    try {
      // Replace 'posts' with your actual Supabase table name
      const { data, error } = await supabase
        .from("posts") // Ensure this is your table name
        .insert([{ content }]); // Insert the post data to the database

      if (error) {
        console.error("Error inserting post:", error);
        setError("Failed to create post. Please try again.");
        return;
      }

      console.log("Post created successfully:", data);
      setContent(""); // Clear the input field
      setError(""); // Clear any previous errors
      onPostCreated(); // Trigger callback to refresh posts in the Feed
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
      <textarea
        rows="4"
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      ></textarea>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={createPost}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          borderRadius: "5px"
        }}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
