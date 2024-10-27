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
  ListItemSecondaryAction,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';

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

// Updated mock elder data with profile picture
const mockElderData = {
  id: '1',
  username: 'John Doe',
  profilePic: 'pp1.jpg', // Replace with actual URL
  // ... other elder details
};

// Mock past medical records data
const mockPastMedicalRecords = [
  { id: 1, name: 'Prescription 2023-01-15.pdf', url: '/path/to/prescription1.pdf' },
  { id: 2, name: 'Prescription 2023-03-22.pdf', url: '/path/to/prescription2.pdf' },
  { id: 3, name: 'Prescription 2023-04-30.pdf', url: '/path/to/prescription3.pdf' },
];

const ElderDetails = () => {
  const { id } = useParams();
  const [elder, setElder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [medications, setMedications] = useState(mockMedications);
  const [openRecords, setOpenRecords] = useState(false);

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

  const handleOpenRecords = () => {
    setOpenRecords(true);
  };

  const handleCloseRecords = () => {
    setOpenRecords(false);
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
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item>
          <Avatar
            src={elder.profilePic}
            alt={elder.username}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4">
            Elder Details: {elder.username}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={handleOpenRecords}
          >
            Past Medical Records
          </Button>
        </Grid>
      </Grid>

      {/* Past Medical Records Dialog */}
      <Dialog open={openRecords} onClose={handleCloseRecords}>
        <DialogTitle>Past Medical Records</DialogTitle>
        <DialogContent>
          <List>
            {mockPastMedicalRecords.map((record) => (
              <ListItem key={record.id} button component="a" href={record.url} target="_blank">
                <ListItemText primary={record.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

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
      </Grid>
    </Box>
  );
};

export default ElderDetails;
