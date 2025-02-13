// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const [session, setSession] = useState(null); // Holds the user session
  const location = useLocation(); // Tracks where the user came from
  const history = useHistory();

  useEffect(() => {
    const handleSession = async () => {
      // Check for an active session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // Redirect to the intended page or to /home by default
        history.push(location.state?.from?.pathname || "/home");
      }
    };

    handleSession();

    // Listen for Supabase authentication changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          // Redirect after login
          history.push(location.state?.from?.pathname || "/home");
        }
      }
    );

    return () => {
      subscription.unsubscribe(); // Cleanup listener on unmount
    };
  }, [history, location.state]);

  if (session) {
    // Display a loading or success message while redirecting
    return <div>Redirecting...</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "facebook", "github"]}
      />
    </div>
  );
};

export default Login;
