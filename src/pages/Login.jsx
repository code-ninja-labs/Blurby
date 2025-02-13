import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [session, setSession] = useState(null); // Holds the user session
  const [isSignupMode, setIsSignupMode] = useState(false); // Toggle Sign-Up / Log-In mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Username for sign-up
  const [profileAvatar, setProfileAvatar] = useState(""); // Avatar URL or path
  const [error, setError] = useState(""); // Error reporting
  const [loading, setLoading] = useState(false); // Loading indicator
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        navigate("/home"); // Redirect user after login or signup
      }
    };

    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          navigate("/home");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Handle Sign-Up
  const handleSignup = async () => {
    setLoading(true);
    setError("");

    if (!email || !password || !username) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Check if username is unique in the profiles table
      const { data: existingUsername, error: usernameCheckError } = await supabase
        .from("profiles") // Reference the profiles table
        .select("username")
        .eq("username", username)
        .single(); // Fetch only one record, if exists

      if (existingUsername) {
        setError("Username already exists. Please choose another.");
        setLoading(false);
        return;
      }

      if (usernameCheckError && usernameCheckError.code !== "PGRST116") {
        // Ignore the error for non-existing records (empty result is expected)
        throw usernameCheckError;
      }

      // Create a new user in the auth.users table
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // Insert profile data into the profiles table
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.user.id, // Use the id from auth.users
          username, // Save the unique username
          profile_avatar: profileAvatar || "/default-avatar.png", // Default to a generic avatar if none provided
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      setLoading(false);
      alert("Signup successful! Redirecting to login...");
      setIsSignupMode(false); // Redirect the user to login mode on success
    } catch (err) {
      console.error("Error during signup:", err.message);
      setError(err.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw loginError;
      }

      setLoading(false);
      navigate("/home"); // Redirect to home
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(err.message || "Invalid login credentials.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isSignupMode ? "Sign Up" : "Log In"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {isSignupMode && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Profile Avatar URL (optional)"
            value={profileAvatar}
            onChange={(e) => setProfileAvatar(e.target.value)}
            style={styles.input}
          />
        </>
      )}
      <button
        onClick={isSignupMode ? handleSignup : handleLogin}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Loading..." : isSignupMode ? "Sign Up" : "Log In"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        {isSignupMode
          ? "Already have an account? "
          : "Don't have an account? "}
        <span
          onClick={() => setIsSignupMode(!isSignupMode)}
          style={styles.toggleMode}
        >
          {isSignupMode ? "Log In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "0 auto", padding: "20px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px" },
  button: { width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" },
  toggleMode: { color: "#007BFF", cursor: "pointer" },
};

export default Login;
          
