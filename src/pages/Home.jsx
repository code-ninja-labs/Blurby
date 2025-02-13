import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [user, setUser] = useState(null); // Stores authenticated user
  const [loading, setLoading] = useState(true); // Tracks session loading

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true); // Set loading state to true
      try {
        const { data: session, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
        }

        if (session?.user) {
          console.log("Authenticated user:", session.user); // Log authenticated user
          setUser(session.user); // Update `user` state with authenticated user
        } else {
          console.log("No user session found.");
          setUser(null); // Explicitly set `user` to `null` for unauthenticated users
        }
      } catch (err) {
        console.error("Session fetch error:", err.message);
      } finally {
        setLoading(false); // Ensure loading state is set to false
      }
    };

    fetchSession();
  }, []);

  /** Debugging State at Each Step */
  console.log("Home Component States - loading:", loading, "user:", user);

  if (loading) {
    return <p>Loading...</p>; // Loading indicator
  }
  if (!user) {
    return <p>No user logged in. Please sign in.</p>; // Placeholder for unauthenticated users
  }

  return (
    <div>
      <h2>Welcome, {user.email}!</h2> {/* Dynamic user email */}
      <p>Here is the Home Page content!</p>
    </div>
  );
};

export default Home;
