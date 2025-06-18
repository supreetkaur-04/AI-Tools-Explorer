import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTools = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/tools`, {
      params: { category }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch tools');
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/favorites`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch favorites');
  }
};

export const addFavorite = async (toolId) => {
  try {
    const response = await axios.post(`${API_URL}/favorites`, { toolId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to save favorite');
  }
};

export const removeFavorite = async (toolId) => {
  try {
    const response = await axios.delete(`${API_URL}/favorites`, { data: { toolId } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to remove favorite');
  }
};