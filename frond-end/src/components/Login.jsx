import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import Header from "./LogoutIcon"; // Import the Header component (with the logout icon)

const Login = () => {
  const navigate = useNavigate();

  const handleNavigate = (role) => {
    if (role === "admin") {
      navigate("/admin"); // Navigate to Admin page
    } else {
      navigate("/user"); // Navigate to User page
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)",
        display: "flex",
        flexDirection: "column", // Stack items vertically
        justifyContent: "flex-start", // Align top
        alignItems: "center", // Center horizontally
      }}
    >
      {/* Header with Logout Icon at the right end */}
      <Header />
      
      {/* Centered content */}
      <Container
        maxWidth="xs"
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          marginTop: "100px", // Add space between Header and content
        }}
      >
        {/* Title - TODOLIST */}
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333", marginBottom: 3 }}>
          TODO LIST
        </Typography>

        {/* Admin and User Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigate("admin")}
          fullWidth
          sx={{
            marginBottom: 2,
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#304ffe" },
          }}
        >
          Admin
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleNavigate("user")}
          fullWidth
          sx={{
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#304ffe" },
          }}
        >
          User
        </Button>
      </Container>
    </div>
  );
};

export default Login;
