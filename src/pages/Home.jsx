import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
        }
        
        if (session?.user) {
          console.log("Authenticated user:", session.user);
          setUser(session.user); // Store the authenticated user
        } else {
          console.log("No user session detected");
          setUser(null); // Explicitly set to null if no user
        }
      } catch (err) {
        console.error("Fetch session error:", err);
      } finally {
        setLoading(false); // Ensure loading stops regardless of fetch success
      }
    };

    fetchSession();
  }, []);

  if (loading) return <p>Loading session...</p>; // Show a loading text until the session is resolved
  if (!user) return <p>No user session. Please log in.</p>; // Message for unauthenticated users

  return <h1>Welcome, {user.email}!</h1>;
};

export default Home;
