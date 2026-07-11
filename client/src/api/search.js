import api from '../services/api';

export const searchDestinations = async (query) => {
  const response = await api.get('/api/search', {
    params: { query },
  });
  return response.data;
};
