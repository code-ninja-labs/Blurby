// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // updated from useHistory

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // updated from useHistory

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login"); // updated from history.push("/login")
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [navigate]); // added navigate dependency

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // updated from history.push("/login")
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
