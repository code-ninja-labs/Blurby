import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, content, like_count, comment_count, created_at, profiles(username, profile_picture)")
        .order("created_at", { ascending: false }); // Fetch latest posts first

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={styles.post}>
          <div style={styles.profile}>
            <img src={post.profiles.profile_picture} alt="Logo" style={styles.logo} />
            <span>{post.profiles.username}</span>
          </div>
          <p>{post.content}</p>
          <div style={styles.meta}>
            <span>Likes: {post.like_count}</span>
            <span>Comments: {post.comment_count}</span>
            <span>{new Date(post.created_at).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  post: { borderBottom: "1px solid #ddd", padding: "10px 0" },
  profile: { display: "flex", alignItems: "center", gap: "10px" },
  logo: { height: "40px", width: "40px", borderRadius: "50%" },
  meta: { fontSize: "12px", color: "#555", marginTop: "10px" },
};

export default Feed;
    
