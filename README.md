
# ResumeAI 📄✨

ResumeAI é uma aplicação web que utiliza o poder da **API do Google Gemini** para gerar resumos inteligentes e personalizados de documentos PDF, além de permitir conversas diretas via chat com a IA. O backend foi totalmente refatorado para seguir uma **arquitetura modular**, com **separação de responsabilidades**, **tratamento de erros** e **testes unitários**.

As informações do projeto estão documentadas no arquivo de [Documentação](https://docs.google.com/document/d/12t1htcrz0WrX57PtD127bYvFT06pZ2o-IGPseK8rGsc/edit?tab=t.0#heading=h.7qmxaezffqpj) do ResumeAI. Além disso, todo o processo de desenvolvimento está registrado no nosso [Google Drive](https://drive.google.com/drive/folders/1Y9EW4qdHHc1WM5-Myxl5D5n9lLmXP_X_?usp=sharing).

---

## 📋 Índice

* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Começando](#começando)

  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Como Usar](#como-usar)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Testes Automatizados](#testes-automatizados)
* [Licença](#licença)

---

## 🚀 Sobre o Projeto

Este projeto é dividido em duas partes:

1. **Frontend (pasta `client`):**

   * Interface web simples e intuitiva para o usuário enviar PDFs ou mensagens ao chat.

2. **Backend (pasta `server`):**

   * API REST desenvolvida com Flask, responsável por:

     * Receber um arquivo PDF + prompt personalizado.
     * Extrair texto do PDF.
     * Enviar o conteúdo para a API do Google Gemini.
     * Retornar o resumo gerado ou a resposta de chat.
     * Tratar erros e entradas malformadas.
     * Manter um código modular com camadas separadas (rotas, serviços, utilitários).

---

## ✨ Funcionalidades

* **Upload de PDF e geração de resumo**
* **Chat direto com a IA Gemini**
* **Tratamento de erros de requisição**
* **Arquitetura limpa com separação de responsabilidades**
* **Testes unitários com Pytest**

---

## 🛠️ Tecnologias Utilizadas

### Frontend (`client`):

* HTML5
* CSS3
* JavaScript (Fetch API)
* React.js

### Backend (`server`):

* Python 3
* Flask
* Flask-CORS
* Python-dotenv
* PyPDF2
* Google Generative AI (Gemini API)
* Pytest (para testes)

---

## 🎈 Como Usar

* Acesse o site em [link](https://devsoftwarefront.onrender.com)
* Siga o tutorial presente na [Documentação de Uso](https://docs.google.com/document/d/1A36k5Kk8LUS4cLFUpXNVKSqoc8kFmkfdt-U2OS0crdI/edit?tab=t.0)

---

## 📂 Estrutura do Projeto (atualizada)

```
.
├── client/
│   ├── public/
│   └── src/
│       ├── index.html
│       ├── index.js
│       └── style.css
├── server/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   ├── services.py
│   │   └── utils.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_routes.py
│   │   └── test_services.py
│   ├── config.py
│   ├── server.py
│   ├── requirements.txt
│   └── .env
├── .venv/
├── .gitignore
└── README.md
```

---

## ✅ Testes Automatizados

### Rodando os testes:

A partir da raiz do projeto (ou da pasta `server`):

```bash
pytest
```

### Abrangência atual dos testes:

* Testes unitários para o arquivo `services.py`
* Testes das rotas principais (`/chat` e `/analyze-pdf`) com **mocks da API Gemini**

---

## 📜 Licença

Este projeto é de uso educacional. Sinta-se livre para modificar, estudar e aprender com o código.
