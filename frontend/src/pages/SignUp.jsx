// src/pages/SignUp.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import './Login.css'; // O estilo do formulário ainda é necessário

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('estudante');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name) {
      setError('Por favor, preencha seu nome.');
      return;
    }

    try {
      await registerUser(name, email, password, role);
      alert('Conta criada com sucesso! Você será redirecionado para o login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="logo-header">
        <h1>🧠ResumeAI</h1>
        <p>Da complexidade à clareza</p>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como podemos te chamar?"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escolha seu melhor e-mail"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crie uma senha forte"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="role">Eu sou</label>
        <select 
          id="role" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="select-input"
        >
          <option value="estudante">Estudante</option>
          <option value="professor">Professor</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <button type="submit">Criar Conta</button>

      <div className="form-footer">
        <span>Já tem uma conta? </span>
        <Link to="/login">Faça login</Link>
      </div>
    </form>
  );
};

export default SignUp;