import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, MenuItem, Snackbar, Alert } from "@mui/material";

const TaskForm = ({ onAdd, loggedInUser, task }) => {
  const [title, setTitle] = useState("");
  const [Assignedto, setAssignedto] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("In Progress");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.tasktitle || "");
      setAssignedto(task.Assignedto || "");
      setPriority(task.Priority || "Low");
      setStatus(task.status || "In Progress");
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!title || !Assignedto) {
      setAlertSeverity("error");
      setErrorMessage("Title and Assigned To fields are required!");
      setOpenSnackbar(true);
      return;
    }

    const newTask = {
      tasktitle: title,
      Assignedto: Assignedto,
      Priority: priority,
      status,
      id: task?.id, // Include task ID if editing
    };

    try {
      const response = await axios.post(
        "http://localhost/todo/controllers/api/admin/post/taskform.php",
        newTask
      );
      if (response.data.status === "success") {
        onAdd(response.data.task); // Notify parent about the added/updated task
        setAlertSeverity("success");
        setErrorMessage(
          task ? "Task updated successfully!" : "Task created successfully!"
        );
        setOpenSnackbar(true);
        resetForm();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setAlertSeverity("error");
      setErrorMessage(error.message || "Failed to add/update task.");
      setOpenSnackbar(true);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAssignedto("");
    setPriority("Low");
    setStatus("In Progress");
  };

  return (
    <Box>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Assigned To"
        value={Assignedto}
        onChange={(e) => setAssignedto(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {task ? "Update Task" : "Add Task"}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskForm;
