// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ProtectedRoute = ({ redirectPath = "/landing" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  // Show loading while fetching user information
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to the landing page or the specified path if not authenticated
  return user ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
