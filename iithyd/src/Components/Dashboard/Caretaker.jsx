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
  Alert,
  Drawer,
  styled
} from '@mui/material';
import { keyframes } from '@mui/system';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AddElderForm from '../Forms/AddElderForm';

const gradientAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  background: 'linear-gradient(45deg, #f0f0f0 0%, #a0a0a0 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 10s ease-in-out infinite`,
  border: '1px solid #d0d0d0',
  borderRadius: theme.shape.borderRadius * 2,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #f0f0f0 0%, #a0a0a0 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 10s ease-in-out infinite`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  color: '#333333',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  padding: '10px 20px',
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const ProfessionalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  color: '#333333',
}));

const CardTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  color: '#333333',
  textAlign: 'center',
}));

const NameTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  color: '#333333',
  textAlign: 'left',
  '&::first-letter': {
    textTransform: 'uppercase',
  },
}));

const Caretaker = () => {
  const [elders, setElders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    console.log('Current location:', location.pathname);
    console.log('Attempting to navigate to:', `/elder/${elderId}`);
    console.log('Elder ID:', elderId);
    navigate(`/elder/${elderId}`);
  };
 
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleElderAdded = () => {
    fetchElders();
    setError('New elder added successfully');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        pl: '240px',
      }}>
        <ProfessionalTypography variant="h4" gutterBottom>
          Caretaker Dashboard
        </ProfessionalTypography>
        <AnimatedButton onClick={handleDrawerOpen}>
          Add Elder
        </AnimatedButton>
      </Box>
      <Box sx={{ pl: '240px' }}>
        <ProfessionalTypography variant="h5" gutterBottom>
          Elders under your care
        </ProfessionalTypography>
        <Grid container spacing={3}>
          {elders.map((elder) => (
            <Grid item xs={12} sm={6} md={4} key={elder._id}>
              <AnimatedCard sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <NameTypography variant="h6" component="div" gutterBottom>
                    {elder.username}
                  </NameTypography>
                  <CardTypography variant="subtitle1" gutterBottom>
                    Age: {elder.age}
                  </CardTypography>
                  <CardTypography variant="body2">
                    Health Status: {elder.healthStatus}
                  </CardTypography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Link to={`/elder/${elder._id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" sx={{ 
                      color: '#333333', 
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }
                    }}>
                      View Details
                    </Button>
                  </Link>
                </CardActions>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <AddElderForm onClose={handleDrawerClose} onElderAdded={handleElderAdded} />
      </Drawer>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity={error === 'New elder added successfully' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Caretaker;
