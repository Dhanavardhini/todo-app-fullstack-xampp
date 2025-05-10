import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios"; // Ensure axios is imported

const ShowAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost/todo/controllers/api/admin/get/Showusers.php"); // Replace with actual URL
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (user) => {
    try {
      // Make a DELETE request to the backend to delete the user
      const response = await axios.delete("http://localhost/todo/controllers/api/admin/delete/deleteuser.php", {
        data: { email: user }, // Send the user's email as the data
      });

      if (response.status === 200) {
        // If deletion is successful, update frontend state
        const updatedUsers = users.filter((u) => u.Email !== user); // Filter out the deleted user
        setUsers(updatedUsers);
        
        // Optionally update localStorage if needed
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <Paper sx={{ width: "100%", height: "100vh", overflow: "hidden", margin: 0, backgroundColor: "#f7f7f7" }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", margin: "20px 0", color: "#2c3e50" }}>
        User Details
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          padding: 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Table sx={{ tableLayout: "auto", minWidth: "600px" }}>
          <TableHead sx={{ backgroundColor: "#2c3e50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#ecf0f1", // Alternate row colors
                  }}
                >
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.Firstname}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.Lastname}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.Email}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    <IconButton color="error" onClick={() => handleDeleteUser(user.Email)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", fontWeight: "bold", color: "#e74c3c", padding: "20px" }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ShowAllUser;
