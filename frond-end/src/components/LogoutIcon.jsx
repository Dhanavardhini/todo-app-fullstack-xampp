import React from "react";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can implement your logout logic here, like clearing session data or redirecting.
    navigate("/"); // Navigate to login page (or home page if needed)
  };

  return (
    <div
      style={{
        width: "98%",
        display: "flex",
        justifyContent: "space-between", // This makes sure that "TODO LIST" is centered and logout icon is at the right end
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#3f51b5",
        color: "white",
        position: "absolute", // Fixing the header to the top
        top: 0,
        left: 0,
      }}
    >
      {/* Title centered */}
      <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
        TODO LIST
      </Typography>
      
      {/* Logout Icon at the right end */}
      <IconButton color="inherit" onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </div>
  );
};

export default Header;
