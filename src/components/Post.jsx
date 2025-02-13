// src/components/Post.jsx
import React from "react";

const Post = ({ post }) => {
  return (
    <div style={styles.post}>
      {/* User details */}
      <div style={styles.profile}>
        <img
          src={post.profiles?.profile_picture || "/default-avatar.png"}
          alt="User Avatar"
          style={styles.profilePicture}
        />
        <span>{post.profiles?.username || "Unknown User"}</span>
      </div>

      {/* Content */}
      <p style={styles.content}>{post.content}</p>

      {/* Metadata */}
      <div style={styles.meta}>
        <span>Likes: {post.like_count}</span>
        <span>Comments: {post.comment_count}</span>
        <span>{new Date(post.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
};

// CSS Styles
const styles = {
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
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Post;
