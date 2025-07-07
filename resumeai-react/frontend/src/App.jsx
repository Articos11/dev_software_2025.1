// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';

// Importe os layouts e páginas
import AuthLayout from './layouts/AuthLayout';
import MainPage from './components/MainPage';
import Login from './components/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import './index.css';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas ou do App Principal (NÃO usam o layout de autenticação) */}
      <Route path="/home" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- Rotas de Autenticação que USAM o AuthLayout --- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Rota raiz que redireciona para a página de login por padrão */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;