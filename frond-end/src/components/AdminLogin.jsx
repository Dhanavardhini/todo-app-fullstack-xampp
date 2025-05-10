import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import Header from "./LogoutIcon";
const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    // Validate input
    if (!email || !password) {
      setSnackbar({ open: true, message: "Both email and password are required.", severity: "error" });
      setLoading(false);
      return;
    }

    // Hardcoded user data
    const users = [{ email: "admin@gmail.com", password: "123456" }];

    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      setSnackbar({ open: true, message: "User does not exist. Please sign up.", severity: "error" });
      setLoading(false);
      return;
    }

    if (existingUser.password !== password) {
      setSnackbar({ open: true, message: "Incorrect password. Please try again.", severity: "error" });
      setLoading(false);
      return;
    }

    // Successful login
    setSnackbar({ open: true, message: "Login successful! Redirecting...", severity: "success" });

    setTimeout(() => {
      setLoading(false);
      navigate("/home"); // Redirect to Admin Dashboard
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header/>
      <Container
        maxWidth="xs"
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Centered Admin Heading */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
          >
            Admin
          </Typography>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#3f51b5" },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#3f51b5" },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#304ffe" },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default AdminLogin;
