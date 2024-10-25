import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const ElderDetails = () => {
  console.log('ElderDetails component rendered');
  const { id } = useParams();
  console.log('Elder ID from params:', id); // Add this for debugging
  const [elder, setElder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching elder details for ID:', id); // Add this for debugging
    fetchElderDetails();
  }, [id]);

  const fetchElderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/elders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch elder details');
      }

      const data = await response.json();
      setElder(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching elder details:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!elder) {
    return <Typography>No elder found with this ID.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {elder.username}'s Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Medications</Typography>
              <List>
                {elder.medications.map((medication, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={medication.name} 
                        secondary={`Dosage: ${medication.dosage}, Time: ${medication.time}`} 
                      />
                    </ListItem>
                    {index < elder.medications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Appointments</Typography>
              <List>
                {elder.appointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={appointment.title} 
                        secondary={`Date: ${appointment.date}, Time: ${appointment.time}`} 
                      />
                    </ListItem>
                    {index < elder.appointments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ElderDetails;
