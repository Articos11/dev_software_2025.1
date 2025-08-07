// src/services/apiServices.js

import axios from 'axios';

// Instância do axios com URL base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' ,
});

// Interceptor: adiciona token JWT em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("token enviado: ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======== Serviços de Autenticação ======== */

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || 'Não foi possível registrar o usuário.');
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || 'Email ou senha inválidos.');
  }
};

/* ======== Serviços da Aplicação ======== */

export const sendMessageToChat = async (message) => {
  try {
    const response = await apiClient.post('/chat', { mensagem: message });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar a API de chat:", error);
    throw error;
  }
};

export const analyzePdf = async (formData) => {
  try {
    const response = await apiClient.post('/analyze-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar a API de análise de PDF:", error);
    throw error;
  }
};
