import axios from 'axios';

const API_URL = 'http://localhost:4000/api/book'; // Replace with your backend URL

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/getBooks`);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/getBooks/${id}`);
  return response.data;
};