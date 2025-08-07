const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao realizar login.');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || 'Erro inesperado no login.');
  }
}

export async function registerUser(name, email, password, role) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || data.error || 'Falha no registro');
    }

    return data.msg || 'Usuário registrado com sucesso';
  } catch (err) {
    throw new Error(err.message || 'Erro inesperado no registro');
  }
}
