import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';

const AddElderForm = ({ onClose, onElderAdded }) => {
  const [newElder, setNewElder] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    healthStatus: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setNewElder({
      ...newElder,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/create-elder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newElder)
      });

      if (!response.ok) {
        throw new Error('Failed to add new elder');
      }

      onElderAdded();
      onClose();
    } catch (err) {
      console.error('Error adding new elder:', err);
      setError(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 300, p: 2 }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Add New Elder</Typography>
      <TextField
        required
        fullWidth
        name="username"
        label="Username"
        value={newElder.username}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={newElder.email}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={newElder.password}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        fullWidth
        name="age"
        label="Age"
        type="number"
        value={newElder.age}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Health Status</InputLabel>
        <Select
          required
          name="healthStatus"
          value={newElder.healthStatus}
          onChange={handleChange}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" fullWidth>
        Add Elder
      </Button>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddElderForm;
