// import React from "react";
// import PropTypes from "prop-types";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
//   const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

//   if (!isAuthenticated) {
//     return <Navigate to="/" state={{ message: "Please log in to access this page." }} />;
//   }

//   // Role-based redirection
//   const { role } = currentUser;

//   if (role === "Admin" && window.location.pathname !== "/home") {
//     return <Navigate to="/home" />;
//   }

//   if (role === "Employer" && window.location.pathname !== "/employeehome") {
//     return <Navigate to="/employeehome" />;
//   }

//   return children;
// };

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ProtectedRoute;
