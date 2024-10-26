import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Checkbox,
  IconButton,
  ListItemSecondaryAction
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Mock heart rate data
const mockHeartRateData = [
  { date: '2023-05-01', rate: 72 },
  { date: '2023-05-02', rate: 75 },
  { date: '2023-05-03', rate: 70 },
  { date: '2023-05-04', rate: 73 },
  { date: '2023-05-05', rate: 71 },
  { date: '2023-05-06', rate: 74 },
  { date: '2023-05-07', rate: 76 },
];

// Mock medications data
const mockMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', time: '08:00 AM', taken: false },
  { id: 2, name: 'Lisinopril', dosage: '10mg', time: '09:00 AM', taken: true },
  { id: 3, name: 'Metformin', dosage: '500mg', time: '01:00 PM', taken: false },
  { id: 4, name: 'Simvastatin', dosage: '20mg', time: '08:00 PM', taken: false },
];

// Mock appointments data
const mockAppointments = [
  { id: 1, title: 'General Checkup', date: '2023-05-15', time: '10:00 AM' },
  { id: 2, title: 'Dental Cleaning', date: '2023-05-20', time: '02:00 PM' },
  { id: 3, title: 'Eye Exam', date: '2023-05-25', time: '11:30 AM' },
];

const ElderDetails = () => {
  const { id } = useParams();
  const [elder, setElder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [medications, setMedications] = useState(mockMedications);

  useEffect(() => {
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

    fetchElderDetails();
  }, [id]);

  const handleMedicationToggle = (medicationId) => {
    setMedications(medications.map(med => 
      med.id === medicationId ? { ...med, taken: !med.taken } : med
    ));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!elder) {
    return <Typography>No elder found with this ID.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Elder Details: {elder.username}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Medications</Typography>
            <List>
              {medications.map((medication) => (
                <React.Fragment key={medication.id}>
                  <ListItem>
                    <Checkbox
                      edge="start"
                      checked={medication.taken}
                      onChange={() => handleMedicationToggle(medication.id)}
                    />
                    <ListItemText 
                      primary={medication.name} 
                      secondary={`Dosage: ${medication.dosage}, Time: ${medication.time}`} 
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="notifications">
                        <NotificationsIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Appointments</Typography>
            <List>
              {mockAppointments.map((appointment) => (
                <React.Fragment key={appointment.id}>
                  <ListItem>
                    <ListItemText 
                      primary={appointment.title} 
                      secondary={`Date: ${appointment.date}, Time: ${appointment.time}`} 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Average Heart Rate Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mockHeartRateData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ElderDetails;
