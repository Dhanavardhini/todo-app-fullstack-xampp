import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import Header from "../components/LogoutIcon";

const EmployeeHomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost/todo/controllers/api/user/Employee.php",
          { withCredentials: true }
        );

        if (response.data && response.data.data) {
          setTasks(response.data.data);
        } else if (response.data && response.data.message) {
          setError(response.data.message);
        } else {
          setError("No tasks found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || "Error fetching tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleFinishTask = async (taskId) => {
    try {
      const response = await axios.post(
        "http://localhost/todo/controllers/api/user/Finishtask.php",
        { taskId },
        { withCredentials: true }
      );

      if (response.data && response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "Finished" } : task
          )
        );
      } else {
        setError("Failed to finish the task.");
      }
    } catch (err) {
      console.error("Error finishing task:", err.response ? err.response.data : err.message);
      setError("Error finishing task.");
    }
  };

  const currentTheme = createTheme({
    palette: { mode: darkMode ? "dark" : "light", primary: { main: darkMode ? "#90caf9" : "#1976d2" } },
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <Header/>
      <Box sx={{ padding: 2 }}>
        {loading ? (
          <Typography variant="body1">Loading tasks...</Typography>
        ) : error ? (
          <Typography variant="body1" sx={{ color: "red" }}>{error}</Typography>
        ) : tasks.length === 0 ? (
          <Typography variant="body1">No tasks assigned to you.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Title</Typography></TableCell>
                  <TableCell><Typography variant="h6">Priority</Typography></TableCell>
                  <TableCell><Typography variant="h6">Status</Typography></TableCell>
                  <TableCell><Typography variant="h6">Action</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.tasktitle}</TableCell>
                    <TableCell>{task.Priority}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleFinishTask(task.id)}
                        disabled={task.status === "Finished"}  // Disable if task is finished
                      >
                        {task.status === "Finished" ? "Completed" : "Finish"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeHomePage;
