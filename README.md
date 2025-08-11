
# ResumeAI 📄✨

ResumeAI é uma aplicação web que utiliza o poder da **API do Google Gemini** para gerar resumos inteligentes e personalizados de documentos PDF, além de permitir conversas diretas via chat com a IA. O backend foi totalmente refatorado para seguir uma **arquitetura modular**, com **separação de responsabilidades**, **tratamento de erros** e **testes unitários**.

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

### Backend (`server`):

* Python 3
* Flask
* Flask-CORS
* Python-dotenv
* PyPDF2
* Google Generative AI (Gemini API)
* Pytest (para testes)

---

## 🏁 Começando

### ✅ Pré-requisitos:

* Python 3.8 ou superior
* pip
* Chave de API do Google Gemini (disponível no [Google AI Studio](https://aistudio.google.com/app/apikey))

---

### ⚙️ Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Configure o ambiente virtual:**

```bash
python -m venv .venv
```

Ative o ambiente:

* **Windows:**

```bash
.venv\Scripts\activate
```

* **Linux/MacOS:**

```bash
source .venv/bin/activate
```

3. **Instale as dependências do backend:**

```bash
cd server
pip install -r requirements.txt
```

4. **Configure o arquivo `.env`:**

Crie um arquivo `.env` dentro da pasta `server`:

```
GEMINI_API_KEY="SUA_CHAVE_API_AQUI"
```

---

## 🎈 Como Usar

1. **Execute o Backend:**

A partir da pasta raiz:

```bash
python server/server.py
```

(Se estiver na pasta `server`, apenas `python server.py`)

O backend estará rodando em:

```
http://127.0.0.1:5000
```

2. **Execute o Frontend:**

Abra a pasta `client` com o Visual Studio Code.

Utilize a extensão **Live Server** ou abra o arquivo `client/src/index.html` diretamente no navegador.

3. **Consuma a API via Frontend ou Thunder Client (VS Code):**

* Rota de chat:

```
POST http://127.0.0.1:5000/chat
Body (JSON):
{
  "mensagem": "Olá"
}
```

* Rota de PDF:

```
POST http://127.0.0.1:5000/analyze-pdf
Form-Data:
- pdf: (arquivo PDF)
- prompt: (texto opcional)
```

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


