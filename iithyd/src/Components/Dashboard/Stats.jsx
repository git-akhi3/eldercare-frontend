import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Button,
  CircularProgress,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Mock data for different time periods
const mockData = {
  week: [
    { date: '2023-05-01', bloodSugar: 120, heartRate: 72 },
    { date: '2023-05-02', bloodSugar: 115, heartRate: 75 },
    { date: '2023-05-03', bloodSugar: 118, heartRate: 70 },
    { date: '2023-05-04', bloodSugar: 122, heartRate: 73 },
    { date: '2023-05-05', bloodSugar: 117, heartRate: 71 },
    { date: '2023-05-06', bloodSugar: 119, heartRate: 74 },
    { date: '2023-05-07', bloodSugar: 121, heartRate: 76 },
  ],
  month: [
    { date: '2023-05-01', bloodSugar: 120, heartRate: 72 },
    { date: '2023-05-08', bloodSugar: 118, heartRate: 74 },
    { date: '2023-05-15', bloodSugar: 116, heartRate: 73 },
    { date: '2023-05-22', bloodSugar: 119, heartRate: 75 },
    { date: '2023-05-29', bloodSugar: 117, heartRate: 72 },
  ],
  year: [
    { date: '2023-01', bloodSugar: 121, heartRate: 73 },
    { date: '2023-02', bloodSugar: 119, heartRate: 72 },
    { date: '2023-03', bloodSugar: 118, heartRate: 74 },
    { date: '2023-04', bloodSugar: 120, heartRate: 73 },
    { date: '2023-05', bloodSugar: 117, heartRate: 75 },
    { date: '2023-06', bloodSugar: 116, heartRate: 72 },
    { date: '2023-07', bloodSugar: 118, heartRate: 74 },
    { date: '2023-08', bloodSugar: 119, heartRate: 73 },
    { date: '2023-09', bloodSugar: 120, heartRate: 75 },
    { date: '2023-10', bloodSugar: 118, heartRate: 72 },
    { date: '2023-11', bloodSugar: 117, heartRate: 74 },
    { date: '2023-12', bloodSugar: 119, heartRate: 73 },
  ],
};

const Stats = () => {
  const [timePeriod, setTimePeriod] = useState('week');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(null);
  const theme = useTheme();

  const handleTimePeriodChange = (event, newTimePeriod) => {
    if (newTimePeriod !== null) {
      setTimePeriod(newTimePeriod);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        // Include credentials if you're using session-based authentication
        // credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      console.log('File analyzed:', result);
      setAnalyzedData(result);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
        Health Stats Over Time
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <ToggleButtonGroup
          value={timePeriod}
          exclusive
          onChange={handleTimePeriodChange}
          aria-label="time period"
          sx={{ 
            '& .MuiToggleButton-root.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }
          }}
        >
          <ToggleButton value="week" aria-label="week">Week</ToggleButton>
          <ToggleButton value="month" aria-label="month">Month</ToggleButton>
          <ToggleButton value="year" aria-label="year">Year</ToggleButton>
        </ToggleButtonGroup>
        <Box>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
              Select PDF
            </Button>
          </label>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || isUploading}
            sx={{ ml: 2 }}
          >
            {isUploading ? <CircularProgress size={24} /> : 'Upload & Analyze'}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              Blood Sugar Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={mockData[timePeriod]}
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
                <Line type="monotone" dataKey="bloodSugar" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              Heart Rate Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={mockData[timePeriod]}
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
                <Line type="monotone" dataKey="heartRate" stroke={theme.palette.secondary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {analyzedData && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                Analyzed Data from PDF
              </Typography>
              <pre>{JSON.stringify(analyzedData, null, 2)}</pre>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Stats;
