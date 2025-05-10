import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt"; 
import PendingActionsIcon from "@mui/icons-material/PendingActions"; 
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import axios from 'axios';

const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    // Fetch task data from the PHP backend
    axios.get('http://localhost/todo/controllers/api/admin/post/dashboard.php')
      .then((response) => {
        // Assuming the response is in the format { totalTasks, completedTasks, pendingTasks }
        setTaskCounts({
          totalTasks: response.data.totalTasks,
          completedTasks: response.data.completedTasks,
          pendingTasks: response.data.pendingTasks,
        });
      })
      .catch((error) => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  const { totalTasks, completedTasks, pendingTasks } = taskCounts;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Task Summary
        </Typography>
        <Grid container spacing={4}>
          {/* Total Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f1c40f",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <AssignmentIcon sx={{ fontSize: 50, color: "#2c3e50", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Total Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                {totalTasks}
              </Typography>
            </Box>
          </Grid>

          {/* Completed Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#2ecc71",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <TaskAltIcon sx={{ fontSize: 50, color: "white", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}>
                Completed Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
                {completedTasks}
              </Typography>
            </Box>
          </Grid>

          {/* Pending Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#e74c3c",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <PendingActionsIcon sx={{ fontSize: 50, color: "white", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}>
                Pending Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
                {pendingTasks}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
