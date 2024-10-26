import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Snackbar,
  Alert,
  Grid,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f0f4f8',
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Backend response:', data); // Add this to debug
        // Check if 'role' is present
        if (!data.role) {
          console.error('Role not included in response');
        }
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        
        // Save the token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        
        // Redirect based on role
        setTimeout(() => {
          switch(data.role) {
            case 'elder':
              navigate('/elder');
              break;
            case 'caretaker':
              navigate('/caretaker');
              break;
            case 'admin':
              navigate('/admin');
              break;
            default:
              navigate('/dashboard');
          }
        }, 1500); // Delay to show the success message
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || 'Login failed. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(45deg, #f3f4f6 30%, #e2e8f0 90%)',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Log In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component="button" variant="body2" onClick={handleRegister} sx={{ textDecoration: 'none' }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
