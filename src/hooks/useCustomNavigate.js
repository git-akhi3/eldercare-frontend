import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  try {
    return useNavigate();
  } catch (error) {
    return (path) => {
      window.location.href = path;
    };
  }
};
