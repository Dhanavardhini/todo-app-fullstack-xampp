import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const API_URL = "http://localhost/todo/controllers/api/admin/get/tasklist.php"; // Your backend URL

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // State for editing task

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL); // No /tasks needed
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL, {
        data: { id },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Approve task and set status to 'Completed'
  const handleApprove = async (id) => {
    try {
      // Update the task status to 'Completed'
      await axios.put("http://localhost/todo/controllers/api/admin/get/Approvelist.php", {
        id,
        status: "Completed",  // Set status to "Completed"
      });
      fetchTasks(); // Refresh tasks after status change
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Edit a task
  const handleEdit = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  // Save the edited task
  const handleSave = async () => {
    try {
      await axios.put(API_URL, editingTask); // Send updated task to the backend
      fetchTasks(); // Refresh tasks after editing
      setEditingTask(null); // Exit editing mode
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Handle row click
  const handleRowClick = (task) => {
    setSelectedTaskId(task.id);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Assignedto
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Priority
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedTaskId === task.id ? "#e3f2fd" : "white",
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: selectedTaskId === task.id ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                  }}
                >
                  {editingTask && editingTask.id === task.id ? (
                    <>
                      <TableCell>
                        <TextField
                          value={editingTask.tasktitle}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, tasktitle: e.target.value })
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editingTask.Assignedto}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, Assignedto: e.target.value })
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editingTask.Priority}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, Priority: e.target.value })
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editingTask.status}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, status: e.target.value })
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{task.tasktitle}</TableCell>
                      <TableCell>{task.Assignedto}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            backgroundColor:
                              task.Priority === "High"
                                ? "red"
                                : task.Priority === "Medium"
                                ? "orange"
                                : "green",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                          }}
                        >
                          {task.Priority}
                        </Box>
                      </TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Task">
                          <IconButton
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(task);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve Task">
                          <IconButton
                            color="success"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(task.id); // Call handleApprove directly
                            }}
                          >
                            {task.status === "Completed" ? (
                              <DoNotDisturbOnIcon />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Task">
                          <IconButton
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task.id);
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No tasks available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
