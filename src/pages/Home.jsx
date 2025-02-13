import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [user, setUser] = useState(null); // Stores authenticated user
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Fetch the Supabase session on mount
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true); // Start loading
      try {
        const { data: session, error } = await supabase.auth.getSession(); // Fetch session from Supabase

        if (error) {
          console.error("Error fetching session:", error.message);
        }

        if (session?.user) {
          console.log("Authenticated user session found:", session.user); // Log authenticated user
          setUser(session.user); // Update user state
        } else {
          console.log("No user session detected.");
        }
      } catch (err) {
        console.error("Error in fetchSession:", err.message);
      } finally {
        setLoading(false); // Stop loading after session check
      }
    };

    fetchSession();
  }, []);

  // Logging for debugging
  console.log({ loading, user }); // Log state values for loading and user

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user session found. Please log in.</p>;
  }

  // If authenticated
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>This is the Home Page!</p>
    </div>
  );
};

export default Home;
