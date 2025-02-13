// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null); // Holds the logged-in user's info
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        history.push("/login"); // Redirect to login if no user
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [history]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    history.push("/login"); // Redirect to login after sign-out
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
