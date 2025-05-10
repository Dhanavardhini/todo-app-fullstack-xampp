import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [dialogMessage, setDialogMessage] = useState(''); // State to store the message for the dialog
  const [successSnackbar, setSuccessSnackbar] = useState(false); // State to show success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const { firstname, lastname, email, password } = formData;
    if (!firstname || !lastname || !email || !password) {
      setDialogMessage('All fields are required!');
      setOpenDialog(true); // Open the dialog if any field is empty
      return; // Prevent form submission
    }

    try {
      // Send POST request to the PHP backend API
      const response = await axios.post('http://localhost/todo/controllers/api/admin/post/signup.php', {
        Firstname: firstname,
        Lastname: lastname,
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        // Show success message
        setSuccessSnackbar(true);

        // Reset form data after successful registration
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        });

        // Redirect to login page after a delay
        setTimeout(() => navigate('/user'), 2000);
      }
    } catch (error) {
      // Handle errors returned from the backend
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'An error occurred while signing up.';

      setDialogMessage(errorMessage);
      setOpenDialog(true); // Open the dialog to display error
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false); // Close the Snackbar
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #ff6f61, #3f51b5)',
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
          padding: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: 'white',
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
          Sign Up
        </Typography>
        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            padding: '10px 20px',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link href="/user" sx={{ color: '#1976d2', textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Box>

      {/* Dialog for error message */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          New user created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
