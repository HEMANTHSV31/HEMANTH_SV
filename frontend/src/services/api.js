import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const userAPI = {
  donateTree: (donationData) => api.post('/users/donate-tree', donationData),
  getUserTrees: (userId) => api.get(`/users/my-trees/${userId}`),
};

export const ngoAPI = {
  getNGODonations: (ngoId) => api.get(`/ngos/my-donations/${ngoId}`),
};

export default api;