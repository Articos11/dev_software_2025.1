import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { user } = await loginUser(email, password);

      // Salva os dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redireciona para a página principal, passando o usuário via state
      navigate('/home', { state: { user } });

    } catch (err) {
      setError(err.message || 'Erro ao realizar login.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="logo-header">
        <h1>ResumeAI</h1>
        <p>Da complexidade à clareza</p>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="email">E-mail</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Digite seu e-mail" 
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
          placeholder="Digite sua senha" 
          required 
        />
      </div>

      <button type="submit">Entrar</button>

      <div className="form-footer">
        <a href="#">Esqueceu a senha?</a>
        <span>|</span>
        <Link to="/signup">Criar conta</Link>
      </div>
    </form>
  );
};

export default Login;
