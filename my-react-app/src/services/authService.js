import axios from 'axios';

const API_URL = 'http://localhost:4000/api/user'; 

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle error gracefully and ensure error.response exists
    const errorMessage = error.response
      ? error.response.data.message
      : 'Login failed. Please try again later.';
    throw new Error(errorMessage);
  }
};


export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData,{withCredentials: true,headers:{"Content-Type":"application/json"}});
  return response.data;
};