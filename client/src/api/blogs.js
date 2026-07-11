import api from '../services/api';

export const fetchBlogs = async () => {
  const response = await api.get('/api/blogs');
  return response.data;
};

export const fetchBlogBySlug = async (slug) => {
  const response = await api.get(`/api/blogs/${slug}`);
  return response.data;
};
