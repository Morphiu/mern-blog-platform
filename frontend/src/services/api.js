import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Current token:', token); // Debug log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data); // Debug log
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message); // Debug log
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Posts endpoints
export const posts = {
  getAll: () => api.get('/posts').then(response => response.data),
  getMyPosts: () => api.get('/posts/user/me').then(response => response.data),
  getById: (id) => api.get(`/posts/${id}`).then(response => response.data),
  create: (postData) => api.post('/posts', postData).then(response => response.data),
  update: (id, postData) => api.put(`/posts/${id}`, postData).then(response => response.data),
  delete: (id) => api.delete(`/posts/${id}`).then(response => response.data),
};

export default api; 