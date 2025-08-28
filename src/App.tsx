import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* If not logged in, show login page */}
        <Route 
          path="/login" 
          element={
            !isLoggedIn ? (
              <Login onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          } 
        />
        
        {/* Dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Register route*/}
        <Route 
          path="/register" 
          element={
            !isLoggedIn ? (
              <Login onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Catch-all route */}
        <Route 
          path="*" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
