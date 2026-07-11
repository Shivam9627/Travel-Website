import api from '../services/api';

export const fetchReviews = async (destinationId) => {
  const response = await api.get(`/api/reviews/${destinationId}`);
  return response.data;
};

export const submitReview = async (review) => {
  const response = await api.post('/api/reviews', review);
  return response.data;
};
