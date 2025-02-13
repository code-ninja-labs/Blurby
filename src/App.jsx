// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home"; // Example protected page
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Public routes */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />

        {/* Protected routes */}
        <ProtectedRoute path="/home" component={Home} />

        {/* Add more protected routes here */}
        {/* For example: <ProtectedRoute path="/profile" component={Profile} /> */}
        {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}

        {/* Catch-all route */}
        <Route path="*" component={() => <h1>404 - Not Found</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
