// src/components/CreatePost.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const CreatePost = ({ user }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Post cannot be empty!");
      return;
    }

    // Insert into the posts table
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: user.id, // Supabase Auth User ID
          content, // Blurb content
        },
      ]);

    if (error) {
      console.error("Error creating post:", error);
      alert("Error creating post! Please try again.");
    } else {
      setContent(""); // Clear input field
      alert("Post created successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        Post
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    resize: "none",
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default CreatePost;
