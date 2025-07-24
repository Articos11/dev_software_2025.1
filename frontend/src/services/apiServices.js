// src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Observe o sufixo /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Envia texto comum para o chat
export const sendMessageToChat = async (message) => {
  try {
    const response = await apiClient.post('/chat', { mensagem: message });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar a API de chat:", error);
    throw error;
  }
};

// Envia PDF com FormData
export const analyzePdf = async (formData) => {
  try {
    const response = await apiClient.post('/analyze-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar a API de análise de PDF:", error);
    throw error;
  }
};

// Registro
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || 'Não foi possível registrar o usuário.');
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || 'Email ou senha inválidos.');
  }
};
