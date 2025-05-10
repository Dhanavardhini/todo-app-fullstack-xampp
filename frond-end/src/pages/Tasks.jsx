import React, { useState, useEffect } from "react";
import { Box, Button, Modal, IconButton, Card, CardContent, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar"; // Import Navbar component

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loggedInUser = currentUser?.firstname || 'Guest'; // Fallback to 'Guest' if firstname doesn't exist

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#303030" : "#fafafa",
        paper: darkMode ? "#424242" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (task) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id ? { ...task, id: editingTask.id } : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditingTask(null); // Clear editing state after save
    } else {
      const newTask = { id: Date.now(), ...task };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    if (selectedTask?.id === taskId) setSelectedTask(null);
  };

  const handleApproveTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status === "Completed" ? "In Progress" : "Completed" }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task); // Set task to be edited
    setIsModalOpen(true); // Open modal to edit
  };

  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e3f2fd", // Set the background color to light blue
          margin: 0,
        }}
      >
        {/* Navbar Component */}
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            overflow: "hidden",
            padding: 0, // Remove unnecessary inner padding
            margin: 0, // Remove margin here
          }}
        >
          {/* Left Section: Task List */}
          <Box
            sx={{
              flex: 2,
              backgroundColor: darkMode ? "#424242" : "#f4f4f4",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              margin: 0, // Remove margin here
              padding: 2, // Optional: Adjust padding as needed
            }}
          >
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onApprove={handleApproveTask}
              onEdit={handleEditTask} // Pass the edit handler
              onRowClick={handleRowClick}
              selectedTaskId={selectedTask?.id}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingTask(null); // Set editingTask to null for new task creation
                setIsModalOpen(true);
              }}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                borderRadius: "50%",
                width: 56,
                height: 56,
                zIndex: 1000,
              }}
            >
              +
            </Button>
          </Box>

          {/* Right Section: Task Details */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: darkMode ? "#303030" : "#ffffff",
              padding: 2,
              boxShadow: darkMode
                ? "0px 4px 15px rgba(255, 255, 255, 0.1)"
                : "0px 4px 15px rgba(0, 0, 0, 0.1)",
              display: selectedTask ? "block" : "none",
              position: "relative",
              borderRadius: 2,
              margin: 0, // Remove margin here
            }}
          >
            {selectedTask && (
              <Card sx={{ padding: 3, boxShadow: 4 }}>
                <IconButton
                  color="error"
                  onClick={handleCloseDetails}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: darkMode ? "#f5f5f5" : "#333",
                    }}
                  >
                    Task Details
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                      <strong>Title:</strong> {selectedTask.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: 1,
                        color: darkMode ? "#e0e0e0" : "#555",
                      }}
                    >
                      <strong>Assigned By:</strong> {selectedTask.assignedBy}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: 1,
                        color: darkMode ? "#e0e0e0" : "#555",
                      }}
                    >
                      <strong>Assigned To:</strong> {selectedTask.assignedTo}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: 1,
                        color: darkMode ? "#e0e0e0" : "#555",
                      }}
                    >
                      <strong>Priority:</strong> {selectedTask.priority}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: 2,
                        color: darkMode ? "#e0e0e0" : "#555",
                      }}
                    >
                      <strong>Status:</strong> {selectedTask.status}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: 2,
                        color: darkMode ? "#e0e0e0" : "#555",
                      }}
                    >
                      <strong>Request:</strong> {selectedTask.request || "No request..."}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
                    {/* Edit Button */}
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditTask(selectedTask)}
                      sx={{ flexGrow: 1 }}
                    >
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteTask(selectedTask.id)}
                      sx={{ flexGrow: 1 }}
                    >
                      Delete
                    </Button>
                    {/* Approve Button (Only if not Completed) */}
                    {selectedTask.status !== "Completed" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproveTask(selectedTask.id)}
                        sx={{ flexGrow: 1 }}
                      >
                        Approve Task
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>

        {/* Task Form Modal */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <IconButton
              color="error"
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              {editingTask ? "Edit Task" : "Create Task"}
            </Typography>
            <TaskForm
              onAdd={handleAddTask}
              loggedInUser={loggedInUser}
              task={editingTask} // Pass task to TaskForm for editing
            />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default Tasks;
