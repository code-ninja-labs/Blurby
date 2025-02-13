import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const [session, setSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    const handleSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        navigate(location.state?.from?.pathname || "/home"); // Redirect user
      }
    };

    handleSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          navigate(location.state?.from?.pathname || "/home"); // Redirect after login
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, location.state]);

  if (session) {
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
