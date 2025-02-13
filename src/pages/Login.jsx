import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const [session, setSession] = useState(null); // Track the Supabase session
  const [userData, setUserData] = useState({
    username: "", // Add username field
    profileAvatar: "", // Add profile avatar field
  });
  const [error, setError] = useState(""); // Handle errors
  const location = useLocation();
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    const handleSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        navigate(location.state?.from?.pathname || "/home"); // Redirect user to home
      }
    };

    handleSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);

        if (event === "SIGNED_IN" && session?.user) {
          // Handle user signup and profile creation
          await checkAndCreateUserProfile(session.user);
          navigate(location.state?.from?.pathname || "/home"); // Redirect after signup/login
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, location.state]);

  // Ensure the profile is created in the "profiles" table
  const checkAndCreateUserProfile = async (user) => {
    try {
      // Check if the profile already exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // If profile already exists, no action needed
      if (profile) return;

      // Insert profile with username and avatar (collected post-signup)
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id, // Link with auth.users.id
          username: userData.username, // User-provided username
          profile_avatar: userData.profileAvatar || "/default-avatar.png", // Default avatar if none
        },
      ]);

      if (insertError) {
        console.error("Error inserting profile:", insertError.message);
        setError("Error creating user profile. Please try again.");
      }
    } catch (error) {
      console.error("Error checking/creating profile:", error.message);
      setError("An error occurred while setting up your profile.");
    }
  };

  // Collect username and avatar after signup
  const handleSignUp = async (event) => {
    const { username, profileAvatar } = userData;
    event.preventDefault();
    setError("");

    if (!username) {
      setError("Username is required.");
      return;
    }

    // Ensure the username is unique
    try {
      const { data: existingUsername, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUsername) {
        setError("Username is already taken. Please choose another.");
        return;
      }

      if (usernameError && usernameError.code !== "PGRST116") {
        throw usernameError;
      }

      alert("Account created successfully! Please login.");
    } catch (err) {
      console.error("Error during signup:", err.message);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  if (session) {
    return <div>Redirecting...</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "facebook", "github"]}
        />

        {/* Form to collect username and avatar for new signups */}
        <form onSubmit={handleSignUp} style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Username (required)"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            style={{ ...styles.input, marginBottom: "10px" }}
            required
          />
          <input
            type="text"
            placeholder="Profile Avatar URL (optional)"
            value={userData.profileAvatar}
            onChange={(e) => setUserData({ ...userData, profileAvatar: e.target.value })}
            style={{ ...styles.input, marginBottom: "10px" }}
          />
          <button type="submit" style={styles.button}>
            Save Profile
          </button>
        </form>

        {/* Display error messages if any */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;
          
