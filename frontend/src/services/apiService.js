import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => {
  return apiClient.get('/products');
};

export const getCart = () => {
  return apiClient.get('/cart');
};

export const addToCart = (productId, qty) => {
  return apiClient.post('/cart', { productId, qty });
};

export const removeFromCart = (cartItemId) => {
  return apiClient.delete(`/cart/${cartItemId}`);
};

export const checkout = () => {
  return apiClient.post('/checkout');
};