import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach JWT automatically
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('medicheck_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Handle 401 globally
API.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('medicheck_token');
      localStorage.removeItem('medicheck_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const register    = d => API.post('/register', d);
export const login       = d => API.post('/login', d);
export const getProfile  = () => API.get('/profile');
export const updateProfile = d => API.put('/profile', d);

// ── Prediction ────────────────────────────────────────────────────────────────
export const getSymptoms  = () => API.get('/symptoms');
export const getDiseases  = () => API.get('/diseases');
export const predict      = d  => API.post('/predict', d);
export const getHistory   = () => API.get('/history');
export const downloadReport = id => API.get(`/report/${id}`, { responseType: 'blob' });

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminStats         = () => API.get('/admin/stats');
export const adminUsers         = () => API.get('/admin/users');
export const adminDeleteUser    = id => API.delete(`/admin/users/${id}`);
export const adminPredictions   = () => API.get('/admin/predictions');
export const adminSymptoms      = () => API.get('/admin/symptoms');
export const adminAddSymptom    = d  => API.post('/admin/symptoms', d);
export const adminUpdateSymptom = (id, d) => API.put(`/admin/symptoms/${id}`, d);
export const adminDeleteSymptom = id => API.delete(`/admin/symptoms/${id}`);
export const adminDiseases      = () => API.get('/admin/diseases');
export const adminAddDisease    = d  => API.post('/admin/diseases', d);
export const adminUpdateDisease = (id, d) => API.put(`/admin/diseases/${id}`, d);
export const adminDeleteDisease = id => API.delete(`/admin/diseases/${id}`);
export const adminLogs          = () => API.get('/admin/logs');

export default API;
