// React Component: UserLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import Header from "./LogoutIcon";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setSnackbar({ open: true, message: "Both email and password are required.", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost/todo/controllers/api/admin/post/post.php", {
        Email: email,
        Password: password,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const data = response.data;

      if (data.message === "Login successful") {
        localStorage.setItem("Firstname", data.Firstname);
        setSnackbar({ open: true, message: "Login successful! Redirecting...", severity: "success" });

        setTimeout(() => {
          setLoading(false);
          navigate("/employeehome");
        }, 2000);
      } else {
        setSnackbar({ open: true, message: data.error, severity: "error" });
        setLoading(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: "An error occurred. Please try again.", severity: "error" });
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
  
    <div style={{ height: "100vh", background: "linear-gradient(135deg, #ff6f61, #3f51b5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Header/>
      <Container maxWidth="xs" sx={{ padding: 4, backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>User Login</Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField label="Email" variant="outlined" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Password" type="password" variant="outlined" name="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: "20px", borderRadius: "8px" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account? <Button variant="text" color="primary" onClick={() => navigate("/signup")}>Sign Up</Button>
        </Typography>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default UserLogin;
