import api from '../services/api';

export const fetchUserProfile = async () => {
  const response = await api.get('/api/auth/profile');
  return response.data;
};
