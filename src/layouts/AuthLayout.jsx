// src/layouts/AuthLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css'; // Importa o CSS do layout

const AuthLayout = () => {
  return (
    <div className="auth-container">
      {/* O Outlet renderizará o componente da rota filha (Login ou SignUp) */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;