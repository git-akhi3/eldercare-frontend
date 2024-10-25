import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    // Redirect to login page
    navigate('/login');
  };

  return logout;
};