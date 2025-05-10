import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import Tasks from "./Tasks"; // Import the Tasks component
import ShowAllUser from "./ShowAllUser";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null); // Store current user
  const [activeTab, setActiveTab] = useState("dashboard"); // Default active tab is "dashboard"
  const [tasks, setTasks] = useState([]); // Store all tasks data
  const [isMenuVisible, setIsMenuVisible] = useState(true); // Track menu visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current user from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user); // Set the current user

    // Example: Fetch tasks data (replace with your actual API call or data fetching logic)
    const allTasks = [
      { id: 1, status: "completed" },
      { id: 2, status: "pending" },
      { id: 3, status: "completed" },
      { id: 4, status: "pending" },
    ];
    setTasks(allTasks); // Set tasks data
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update the active tab
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev); // Toggle menu visibility
  };

  // Calculate task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        maxHeight: "100vh", // Prevent overflow
        overflow: "hidden", // Hide overflow content
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      {/* Left Side Menu */}
      <Box
        sx={{
          width: isMenuVisible ? "25%" : "0%",
          backgroundColor: "#2c3e50",
          padding: isMenuVisible ? 3 : 0,
          borderRight: isMenuVisible ? "1px solid #ddd" : "none",
          color: "white",
          overflowY: isMenuVisible ? "auto" : "hidden", // Scrollable menu if content exceeds height
          transition: "width 0.3s ease",
          position: "relative",
        }}
      >
        {isMenuVisible && (
          <>
            {/* Current User Tile */}
            {/* <Box
              sx={{
                padding: 3,
                backgroundColor: "#34495e",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                {currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : "No User"}
              </Typography>
            </Box> */}

            {/* Menu Links */}
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleTabChange("dashboard")}
                sx={{
                  marginBottom: 2,
                  borderRadius: "8px",
                  backgroundColor: "#2980b9",
                  "&:hover": {
                    backgroundColor: "#3498db",
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleTabChange("tasks")}
                sx={{
                  marginBottom: 2,
                  borderRadius: "8px",
                  backgroundColor: "#2980b9",
                  "&:hover": {
                    backgroundColor: "#3498db",
                  },
                }}
              >
                Tasks
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleTabChange("showAllUsers")}
                sx={{
                  marginBottom: 2,
                  borderRadius: "8px",
                  backgroundColor: "#2980b9",
                  "&:hover": {
                    backgroundColor: "#3498db",
                  },
                }}
              >
                Show All Users
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#c0392b",
                  "&:hover": {
                    backgroundColor: "#e74c3c",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Toggle Menu Arrow */}
      <IconButton
        onClick={toggleMenuVisibility}
        sx={{
          position: "absolute",
          top: "50%",
          left: isMenuVisible ? "29%" : "0%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#34495e",
          color: "white",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "#2c3e50",
          },
        }}
      >
        {isMenuVisible ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      </IconButton>

      {/* Right Side */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Allow scrolling for the main content area
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeTab === "dashboard" && <Dashboard />} {/* Default tab */}
        {activeTab === "tasks" && (
          <Tasks
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
        )}
        {activeTab === "showAllUsers" && <ShowAllUser />}
      </Box>
    </div>
  );
};

export default HomePage;
