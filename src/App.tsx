import {  useState } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
  
  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />) : (
            <Route path="*" element={<Dashboard />} />
          )
         }
      </Routes>
    </Router>
  )
}

export default App