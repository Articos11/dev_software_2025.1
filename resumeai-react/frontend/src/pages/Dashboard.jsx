import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Bem-vindo!</h1>
        <p>Não foi possível carregar os dados do usuário.</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Olá, {user.name}!</h1>
      <p>Login realizado com sucesso.</p>
      <p><strong>Seu e-mail:</strong> {user.email}</p>
      <p><strong>Sua ocupação:</strong> {user.role}</p>
    </div>
  );
};

export default Dashboard;