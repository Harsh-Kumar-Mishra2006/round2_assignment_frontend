import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://round2-assignment-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

export const postAPI = {
  getAll: () => api.get('/posts'),
  getById: (id: string) => api.get(`/posts/${id}`),
  create: (title: string, content: string) =>
    api.post('/posts', { title, content }),
  update: (id: string, title: string, content: string) =>
    api.put(`/posts/${id}`, { title, content }),
  delete: (id: string) => api.delete(`/posts/${id}`),
  like: (id: string) => api.put(`/posts/${id}/like`),
};

export const commentAPI = {
  getByPost: (postId: string) => api.get(`/comments/${postId}`),
  create: (text: string, postId: string) =>
    api.post('/comments', { text, postId }),
  delete: (id: string) => api.delete(`/comments/${id}`),
};

export default api;