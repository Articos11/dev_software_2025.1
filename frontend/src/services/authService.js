const API_URL = 'http://localhost:3001';

// função para registrar um novo usuario
export const registerUser = async (name, email, password, role) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao registrar.');
  }
  return await response.json();
};

// Função para fazer o login
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao fazer login.');
  }
  const data = await response.json();
  return data.user;
};