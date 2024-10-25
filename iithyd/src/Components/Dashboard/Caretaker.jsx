import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Caretaker = () => {
  const [elders, setElders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchElders();
  }, []);

  const fetchElders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/elders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch elders');
      }

      const data = await response.json();
      setElders(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching elders:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleViewDetails = (elderId) => {
    navigate(`/elder/${elderId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Caretaker Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Elders under your care
      </Typography>
      <Grid container spacing={3}>
        {elders.map((elder) => (
          <Grid item xs={12} sm={6} md={4} key={elder.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {elder.username}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Age: {elder.age}
                </Typography>
                <Typography variant="body2">
                  Health Status: {elder.healthStatus}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleViewDetails(elder.id)}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Caretaker;

