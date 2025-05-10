import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Signup from "./components/Signup";
import Dashboard from "./pages/Tasks";
import HomePage from "./pages/HomePage";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import UserLogin from "./components/UserLogin";
import Login from "./components/Login";
import Header from "./components/LogoutIcon";

// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/user" element={<UserLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/home"
          element={
         
              <HomePage />
         
          }
        />
        <Route
          path="/employeehome"
          element={
            
              <EmployeeHomePage />
           
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
