import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Initialize Supabase Client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const Login = () => {
  const [session, setSession] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Check for an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for login or logout events
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (!session) {
    // If the user is not logged in, show the Supabase Auth interface
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "facebook", "github"]}
        />
      </div>
    );
  } else {
    // If the user is logged in, redirect them or show a logged-in view
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h2>Welcome to Blurry!</h2>
        <p>You are logged in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        <br />
        <button onClick={() => history.push("/")}>Go to Home</button>
      </div>
    );
  }
};

export default Login;
