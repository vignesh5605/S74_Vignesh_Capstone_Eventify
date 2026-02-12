import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getVendors = async (category = '') => {
  try {
    const params = category ? { category } : {};
    const response = await api.get('/vendors', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const submitQuoteRequest = async (quoteData) => {
  try {
    const response = await api.post('/quotes', quoteData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getQuoteRequests = async () => {
  try {
    const response = await api.get('/quotes');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    const message = error.response.data?.message || 'Something went wrong';
    return new Error(message);
  } else if (error.request) {
    return new Error('Unable to connect to server. Please try again.');
  } else {
    return new Error('Request failed. Please try again.');
  }
};

export default api;
