import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Forms/Login';
import Signup from './Components/Forms/Signup';
import Elder from './Components/Dashboard/Elder';
import Caretaker from './Components/Dashboard/Caretaker';
import Admin from './Components/Dashboard/Admin';
import DashboardLayout from './Components/Layout/DashboardLayout';
import { ColorModeContext } from './contexts/ColorModeContext';
import ElderDetails from './Components/Dashboard/ElderDetails';
import Navbar from './Components/Landing/Navbar';
import HeroSection from './Components/Landing/HeroSection';
import FeatureSection from './Components/Landing/FeatureSection';
import Workflow from './Components/Landing/Workflow';
import Testimonials from './Components/Landing/Testimonials';
import CaregiversDashboard from './Components/Dashboard/Caretaker';
import Stats from './Components/Dashboard/Stats';
import Footer from './Components/Landing/Footer';
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const path = window.location.pathname;

  console.log('ProtectedRoute - Current path:', path);
  console.log('ProtectedRoute - User role:', userRole);

  if (!token) {
    console.log('ProtectedRoute - No token, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if user is trying to access a route they're not allowed to
  if (
    (path.startsWith('/elder') && userRole !== 'elder' && userRole !== 'caretaker') ||
    (path.startsWith('/caretaker') && userRole !== 'caretaker') ||
    (path.startsWith('/admin') && userRole !== 'admin')
  ) {
    console.log('ProtectedRoute - Unauthorized access, redirecting');
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'elder':
        return <Navigate to="/elder" replace />;
      case 'caretaker':
        return <Navigate to="/caretaker" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  console.log('ProtectedRoute - Rendering children');
  return children;
};

// Auth Layout Component (for pages that should only be accessible when NOT logged in)
const AuthLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (token) {
    // Redirect to appropriate dashboard if already logged in
    switch (userRole) {
      case 'elder':
        return <Navigate to="/elder" replace />;
      case 'caretaker':
        return <Navigate to="/caretaker" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

const LoggingRoute = ({ element, path }) => {
  console.log(`Rendering route: ${path}`);
  return element;
};

function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroSection />
                <FeatureSection />
                <Workflow />
                
              
                <Footer />
              </>
            }
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />
          <Route 
            path="/elder/:id" 
            element={
              <LoggingRoute
                path="/elder/:id"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ElderDetails />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            } 
          />
          
            <Route 
              path="/elder"
              element={
                <LoggingRoute
                  path="/elder"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Elder />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
              }
            />
           


          {/* Protected Routes */}
          
          
          <Route
            path="/caretaker"
            element={
              <LoggingRoute
                path="/caretaker"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Caretaker />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            }
          />
          <Route
            path="/caretaker/stats"
            element={
              <LoggingRoute
                path="/caretaker/stats"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Stats/>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            }
          />
          
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Admin />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          

          {/* Redirect root to login */}
          <Route
            path="/"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
                <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Go Back
                </button>
              </div>
            }
          />
          <Route path="/caregiver" element={<CaregiversDashboard />} />
          <Route path="/caregiver/elder/:id" element={<ElderDetails />} />
          <Route path="/caregiver/stats" element={<Stats />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
