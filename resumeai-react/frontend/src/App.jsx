// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';

// Importe os layouts e páginas
import AuthLayout from './layouts/AuthLayout';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CheckInfosPage from './pages/CheckInfosPage';

import './index.css';
import SaveSummaryPage from './pages/SaveSummaryPage';
import MySummariesPage from './pages/MySummariesPage';
import FlashcardPage from './pages/FlashcardPage';
import MyFlashcardsPage from './pages/MyFlashcardsPage';

function App() {

    const meusFlashcards = [
    { id: '1', title: 'Matemática Discreta - Conjuntos aaaaaaaaaaaaaaaaa', date: '15/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '2', title: 'SQL Básico - Comandos DML', date: '16/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', icon: 'src/assets/Ativo 29.svg' },
  ];

    const meusResumos = [
    { id: 'r1', title: 'Resumo sobre OVNIs', date: '19/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: 'r2', title: 'Resumo de TCC - Parte 1', date: '20/07/2025', icon: 'src/assets/Ativo 29.svg' },
    { id: 'r3', title: 'Artigo Científico', date: '20/07/2025', icon: 'src/assets/Ativo 29.svg' },
  ];

  return (
    <Routes>
      {/* Rotas Públicas ou do App Principal (NÃO usam o layout de autenticação) */}
      <Route path="/home" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/conferir_texto" element={<CheckInfosPage />} />
      <Route path="/salvar_resumo" element={<SaveSummaryPage />} />
      <Route path="/flashcards" element={<MyFlashcardsPage flashcards={meusFlashcards} />} />
      <Route path="/flashcards/:id" element={<FlashcardPage />} />
      <Route path="/resumos" element={<MySummariesPage summaries={meusResumos} />} />

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