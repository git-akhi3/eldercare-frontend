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

const ElderDetails = () => {
  const { id } = useParams();
  const [elder, setElder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [medications, setMedications] = useState([]);
  const [openRecords, setOpenRecords] = useState(false);

  useEffect(() => {
    const fetchElderDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching elder details for ID:', id);
        const response = await fetch(`/api/users/elder/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Error response:', errorData);
          throw new Error(`Failed to fetch elder details: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched elder data:', data);
        setElder(data);
        // Assuming medications are part of the elder data
        setMedications(data.medications || []);
      } catch (err) {
        console.error('Error fetching elder details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElderDetails();
  }, [id]);

  const handleMedicationToggle = (medicationId) => {
    // Implement medication toggle logic here
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
            View Medical Records
          </Button>
        </Grid>
      </Grid>

      <Dialog open={openRecords} onClose={handleCloseRecords}>
        <DialogTitle>Past Medical Records</DialogTitle>
        <DialogContent>
          <List>
            {elder.medicalRecords && elder.medicalRecords.map((record) => (
              <ListItem key={record._id} button component="a" href={record.url} target="_blank">
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
                <React.Fragment key={medication._id}>
                  <ListItem>
                    <Checkbox
                      edge="start"
                      checked={medication.taken}
                      onChange={() => handleMedicationToggle(medication._id)}
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
              {elder.appointments && elder.appointments.map((appointment) => (
                <React.Fragment key={appointment._id}>
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
