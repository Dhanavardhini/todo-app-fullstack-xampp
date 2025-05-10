import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Indigo color for the primary theme
    },
    secondary: {
      main: '#ff4081', // Pink color for secondary actions
    },
    error: {
      main: '#f44336', // Red color for error messages
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  spacing: 8,
});

export default theme;
