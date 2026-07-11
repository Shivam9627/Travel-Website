import api from '../services/api';

export const fetchTransport = async () => {
  const response = await api.get('/api/transport');
  return response.data;
};