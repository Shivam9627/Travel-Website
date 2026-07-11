import api from '../services/api';

export const fetchDestinations = async () => {
  const response = await api.get('/api/destinations');
  return response.data;
};

export const fetchDestinationById = async (id) => {
  const response = await api.get(`/api/destinations/${id}`);
  return response.data;
};
