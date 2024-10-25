import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, CircularProgress ,Button} from '@mui/material';
import { useLogout } from '../../auth/auth';

const Elder = () => {
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch medicines
        const medicinesResponse = await fetch('/api/medicines', { headers });
        if (!medicinesResponse.ok) throw new Error('Failed to fetch medicines');
        const medicinesData = await medicinesResponse.json();
        setMedicines(medicinesData);

        // Fetch appointments
        const appointmentsResponse = await fetch('/api/appointments', { headers });
        if (!appointmentsResponse.ok) throw new Error('Failed to fetch appointments');
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Elder Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Medicines
            </Typography>
            <List>
              {medicines.map((medicine, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={medicine.name} 
                    secondary={`Dosage: ${medicine.dosage}, Time: ${medicine.time}`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Appointments
            </Typography>
            <List>
              {appointments.map((appointment, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={appointment.doctorName} 
                    secondary={`Date: ${appointment.date}, Time: ${appointment.time}`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Elder;