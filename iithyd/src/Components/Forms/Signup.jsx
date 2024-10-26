import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Link
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Form validation
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      setSnackbarMessage('Please fill in all fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbarMessage('Please enter a valid email address');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration request with data:', formData); // Debug log

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // credentials: 'include', // Include cookies if your API uses sessions
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status); // Debug log
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok) {
        setSnackbarMessage('Signup successful! Please log in.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          role: '',
        });
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      setSnackbarMessage(error.message || 'An error occurred during registration');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleLogin = () => {
    navigate('/login');
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value="elder">Elder</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="caretaker">Caretaker</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component="button" variant="body2" onClick={handleLogin} sx={{ textDecoration: 'none' }}>
                    Already have an account? Log in
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

export default Signup;
