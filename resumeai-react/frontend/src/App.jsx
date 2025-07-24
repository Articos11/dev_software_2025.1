// src/App.jsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Removido useParams, useNavigate daqui
import { useParams, useNavigate, Link } from "react-router-dom"; // Reimportado useParams, useNavigate para o Wrapper se ainda for usar (não vai)

// Importe os layouts e páginas
import AuthLayout from "./layouts/AuthLayout";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CheckInfosPage from "./pages/CheckInfosPage";
import SaveSummaryPage from "./pages/SaveSummaryPage";
import MySummariesPage from "./pages/MySummariesPage";
import MyFlashcardsPage from "./pages/MyFlashcardsPage"; // Página que lista os TEMAS
import FlashcardPage from "./pages/FlashcardPage"; // ✨ A PÁGINA QUE EXIBE A SEQUÊNCIA DE FLASHCARDS DE UM TEMA

// Importe o CSS global
import "./index.css";
import SummaryPage from "./pages/SummaryPage";

function App() {
  const meusFlashcardsThemes = [
    {
      id: "tema-1",
      title: "Matemática Discreta - Conjuntos",
      date: "15/07/2025",
      icon: "src/assets/Ativo 29.svg",
      flashcards: [
        {
          id: "f1-1",
          question: "O que é um conjunto no contexto da matemática discreta?",
          answer: "É uma coleção não ordenada de elementos distintos.",
        },
        {
          id: "f1-2",
          question: "Qual a diferença entre união e interseção de conjuntos?",
          answer:
            "União junta todos os elementos; interseção pega apenas os comuns.",
        },
        {
          id: "f1-3",
          question: "Cite três operações básicas de conjuntos e seus símbolos.",
          answer: "União (∪), Interseção (∩), Diferença (-).",
        },
        {
          id: "f1-4",
          question: "Pergunta 4 do Tema 1",
          answer: "Resposta 4 do Tema 1.",
        },
        {
          id: "f1-5",
          question: "Pergunta 5 do Tema 1",
          answer: "Resposta 5 do Tema 1.",
        },
      ],
    },
    {
      id: "tema-2",
      title: "SQL Básico - Comandos DML",
      date: "16/07/2025",
      icon: "src/assets/Ativo 29.svg",
      flashcards: [
        {
          id: "f2-1",
          question: "Para que serve o comando SELECT?",
          answer: "Selecionar dados de um banco de dados.",
        },
        {
          id: "f2-2",
          question: "Como inserir dados em uma tabela?",
          answer: "Usando INSERT INTO table_name VALUES (...).",
        },
        {
          id: "f2-3",
          question: "Qual comando modifica dados existentes?",
          answer: "UPDATE.",
        },
      ],
    },
    {
      id: "tema-3",
      title: "React Hooks - useState",
      date: "17/07/2025",
      icon: "src/assets/Ativo 29.svg",
      flashcards: [
        {
          id: "f3-1",
          question: "Qual a finalidade do Hook useState?",
          answer: "Adicionar estado a componentes funcionais React.",
        },
        {
          id: "f3-2",
          question: "Como se atualiza um estado usando useState?",
          answer:
            'Usando a função "setter" retornada por useState (ex: `setCount(newValue)`).',
        },
      ],
    },
  ];

  const meusResumos = [
    {
      id: "r1",
      title: "Resumo sobre OVNIs",
      date: "19/07/2025",
      icon: "src/assets/Ativo 29.svg", // Assumindo o mesmo ícone padrão
      content: `Este é o conteúdo COMPLETO do resumo sobre OVNIs. Ele pode ser bem longo e conter vários parágrafos e informações detalhadas sobre avistamentos, teorias da conspiração, abduções e o impacto cultural dos fenômenos aéreos não identificados. A ideia é que o texto se expanda e tenha sua própria barra de rolagem se for necessário, sem quebrar o layout da página principal.

Parágrafo 2: Muitos casos famosos, como Roswell ou o incidente de Kecksburg, contribuíram para a popularidade do tema. A falta de explicações oficiais e a natureza misteriosa dos avistamentos mantêm o debate aceso entre céticos e crentes.
Parágrafo 2: Muitos casos famosos, como Roswell ou o incidente de Kecksburg, contribuíram para a popularidade do tema. A falta de explicações oficiais e a natureza misteriosa dos avistamentos mantêm o debate aceso entre céticos e crentes.
Parágrafo 2: Muitos casos famosos, como Roswell ou o incidente de Kecksburg, contribuíram para a popularidade do tema. A falta de explicações oficiais e a natureza misteriosa dos avistamentos mantêm o debate aceso entre céticos e crentes.
Parágrafo 2: Muitos casos famosos, como Roswell ou o incidente de Kecksburg, contribuíram para a popularidade do tema. A falta de explicações oficiais e a natureza misteriosa dos avistamentos mantêm o debate aceso entre céticos e crentes.

Parágrafo 3: A pesquisa científica sobre OVNIs (agora UAPs - Fenômenos Aéreos Não Identificados) tem ganhado mais atenção recentemente, com governos liberando relatórios e dados para análise pública e científica.`

,
    },
    {
      id: "r2",
      title: "Resumo de TCC - Parte 1",
      date: "20/07/2025",
      icon: "src/assets/Ativo 29.svg",
      content: `A primeira parte do resumo do Trabalho de Conclusão de Curso aborda a introdução e o referencial teórico. Discute-se a relevância do tema, a formulação do problema de pesquisa e os principais objetivos a serem alcançados.

O referencial teórico explora os conceitos fundamentais e as teorias que sustentam a investigação, apresentando autores e estudos relevantes que servem de base para a análise dos dados. Inclui-se também a justificativa, que ressalta a importância e as contribuições esperadas da pesquisa para a área de estudo.`,
    },
    {
      id: "r3",
      title: "Artigo Científico",
      date: "20/07/2025",
      icon: "src/assets/Ativo 29.svg",
      content: `Este resumo de artigo científico apresenta os métodos, resultados e conclusões de um estudo experimental sobre novos materiais compósitos à base de polímeros reciclados. Foram avaliadas propriedades mecânicas (resistência à tração, flexão) e térmicas (estabilidade, condutividade).

Os resultados indicaram uma melhoria significativa nas propriedades mecânicas com a adição de fibras de carbono em concentrações específicas, sem comprometer a reciclabilidade do material. Conclui-se que o uso desses compósitos pode ser uma alternativa sustentável para aplicações industriais.`,
    },
  ];

  return (
    <Routes>
      {/* Rotas Públicas ou do App Principal */}
      <Route path="/home" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/conferir_texto" element={<CheckInfosPage />} />
      <Route path="/salvar_resumo" element={<SaveSummaryPage />} />

      {/* Rota para a lista de TEMAS de Flashcards */}
      <Route
        path="/flashcards"
        element={<MyFlashcardsPage flashcardThemes={meusFlashcardsThemes} />}
      />
      <Route
        path="/flashcards/:themeId"
        element={<FlashcardPage allFlashcardThemes={meusFlashcardsThemes} />}
      />

      <Route
        path="/resumos"
        element={<MySummariesPage summaries={meusResumos} />}
      />
      <Route
        path="/resumos/:summaryId"
        element={<SummaryPage allSummaries={meusResumos} />}
      />

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
