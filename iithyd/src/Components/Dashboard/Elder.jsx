import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import { useLogout } from '../../auth/auth';
import { Link } from 'react-router-dom';

// Mock data for elders list
const mockElders = [
  { id: '1', username: 'John Doe', profilePic: 'https://example.com/john.jpg' },
  { id: '2', username: 'Jane Smith', profilePic: 'https://example.com/jane.jpg' },
  { id: '3', username: 'Bob Johnson', profilePic: 'https://example.com/bob.jpg' },
];

// Mock data for medications
const mockMedications = [
  { name: 'Aspirin', dosage: '100mg', time: '08:00 AM' },
  { name: 'Lisinopril', dosage: '10mg', time: '09:00 AM' },
  { name: 'Metformin', dosage: '500mg', time: '01:00 PM' },
  { name: 'Simvastatin', dosage: '20mg', time: '08:00 PM' },
];

// Mock data for appointments
const mockAppointments = [
  { doctorName: 'Dr. Smith', date: '2023-05-15', time: '10:00 AM' },
  { doctorName: 'Dr. Johnson', date: '2023-05-20', time: '02:00 PM' },
  { doctorName: 'Dr. Williams', date: '2023-05-25', time: '11:30 AM' },
];

const Elder = () => {
  const [elders] = useState(mockElders);
  const [medicines] = useState(mockMedications);
  const [appointments] = useState(mockAppointments);
  const logout = useLogout();

  const handleEmergency = () => {
    alert('Emergency services have been notified!');
    // In a real application, this would trigger an actual emergency response
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Elder Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="error" 
            size="large" 
            fullWidth 
            onClick={handleEmergency}
            sx={{ py: 2, mb: 3 }}
          >
            EMERGENCY
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            {/* <Typography variant="h6" gutterBottom>
              Elders List
            </Typography>
            <List>
              {elders.map((elder) => (
                <ListItem key={elder.id} component={Link} to={`/elder/${elder.id}`}>
                  <ListItemAvatar>
                    <Avatar src={elder.profilePic} alt={elder.username} />
                  </ListItemAvatar>
                  <ListItemText primary={elder.username} />
                </ListItem>
              ))}
            </List> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Medications
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
        <Grid item xs={12} md={4}>
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
