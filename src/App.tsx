import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import apiClient , {setAccessToken} from "./services/api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const checkRefresh = async () => {
      try {
        const res = await apiClient.get("/refresh");
        if (res.data.accessToken) {
          setAccessToken(res.data.accessToken); 
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        console.log("Not logged in");
        setIsLoggedIn(false);
      }
    };
    checkRefresh();
  }, []);


  if (isLoggedIn === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
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
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Register onRegister={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
