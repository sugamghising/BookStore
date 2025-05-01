import axios from 'axios';

const API_URL = 'http://localhost:4000/api/book';

// Create configured axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getBooks = async () => {
  try {
    const response = await api.get('/getBooks'); // Use api instance
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/getBooks/${id}`); // Use api instance
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const addBook = async (bookData) => {
  console.log('Adding book:', bookData); // Log the book data
  try {
    const response = await api.post('/addBooks', bookData); // Use api instance
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/updateBooks/${id}`, bookData); // Use api instance
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/deleteBooks/${id}`); // Use api instance
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};