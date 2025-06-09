# ResumeAI 📄✨

ResumeAI é uma aplicação web que utiliza o poder da API do Google Gemini para gerar resumos inteligentes e personalizados de documentos PDF. Faça o upload de um arquivo, insira um prompt específico se desejar, e obtenha um resumo conciso em segundos.

![ResumeAI Screenshot](https://i.imgur.com/your-screenshot-url.png) 
*(Sugestão: tire um print da tela do seu projeto em funcionamento, faça o upload em um site como o [Imgur](https://imgur.com/upload) e substitua o link acima)*

---

## 📋 Índice

* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Começando](#começando)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
* [Como Usar](#como-usar)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Licença](#licença)

---

## 🚀 Sobre o Projeto

Este projeto consiste em uma interface de frontend (localizada na pasta `client`) que se comunica com um backend em Python/Flask (localizado na pasta `server`). O backend é responsável por:

1.  Receber um arquivo PDF e um prompt do usuário.
2.  Extrair o texto do PDF.
3.  Formatar uma requisição para a API do Google Gemini, combinando o texto extraído e o prompt do usuário.
4.  Retornar a resposta gerada pela IA para o frontend, que a exibe ao usuário.

### ✨ Funcionalidades

* **Upload de PDF:** Envie qualquer documento em formato PDF para análise.
* **Prompt Personalizado:** Guie a IA com instruções específicas para obter o resumo desejado.
* **Integração com Gemini API:** Utiliza o modelo `gemini-1.5-flash-latest` para processamento rápido e eficiente.
* **Interface Simples:** Uma interface limpa e intuitiva para uma experiência de usuário agradável.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

* **Frontend (`client`):**
    * HTML5
    * CSS3
    * JavaScript (com Fetch API)

* **Backend (`server`):**
    * [Python 3](https://www.python.org/)
    * [Flask](https://flask.palletsprojects.com/)
    * [Flask-CORS](https://flask-cors.readthedocs.io/)

* **APIs e Bibliotecas Python:**
    * [Google Generative AI for Python](https://pypi.org/project/google-generativeai/)
    * [PyPDF2](https://pypi.org/project/PyPDF2/)
    * [python-dotenv](https://pypi.org/project/python-dotenv/)

---

## 🏁 Começando

Siga estas instruções para obter uma cópia do projeto e executá-la em sua máquina local para desenvolvimento e testes.

### ✅ Pré-requisitos

* **Python 3.8+** instalado.
* **pip** (gerenciador de pacotes do Python).
* Uma **Chave de API do Google Gemini**. Você pode obter uma no [Google AI Studio](https://aistudio.google.com/app/apikey).

### ⚙️ Instalação

Siga o passo a passo abaixo no seu terminal, a partir da pasta raiz do projeto.

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Crie e configure o ambiente virtual:**
    * Crie o ambiente na pasta raiz do projeto:
        ```bash
        python -m venv .venv
        ```
    * Ative o ambiente virtual:
        * No **Windows** (Git Bash ou PowerShell):
            ```bash
            source .venv/Scripts/activate
            ```
        * No **Linux ou macOS**:
            ```bash
            source .venv/bin/activate
            ```

3.  **Instale as dependências do Backend:**
    * Com o ambiente virtual ativado, instale as bibliotecas Python a partir do `requirements.txt`:
        ```bash
        pip install -r requirements.txt
        ```

4.  **Configure a Chave de API:**
    * Navegue até a pasta do servidor:
        ```bash
        cd server
        ```
    * Crie um arquivo chamado `.env` e adicione sua chave da API do Gemini:
        ```
        GEMINI_API_KEY="SUA_CHAVE_API_AQUI"
        ```
    * Volte para a pasta raiz:
        ```bash
        cd ..
        ```

Tudo pronto! O ambiente está configurado.

---

## 🎈 Como Usar

Para rodar a aplicação, você precisa iniciar o servidor backend e o cliente frontend separadamente.

1.  **Inicie o Servidor Backend:**
    * Certifique-se de que seu ambiente virtual (`.venv`) está ativado.
    * A partir da pasta **raiz** do projeto, execute o seguinte comando:
        ```bash
        python server/api.py
        ```
    * O servidor estará rodando em `http://127.0.0.1:5000`. Deixe este terminal aberto.

2.  **Inicie a Interface Frontend:**
    * A maneira mais fácil de rodar o frontend é utilizando a extensão **Live Server** no Visual Studio Code.
    * Clique com o botão direito no arquivo `client/src/index.html` e selecione "Open with Live Server".
    * Seu navegador abrirá a página da aplicação.

3.  **Utilize a Aplicação:**
    * Com a página aberta, você pode escrever um prompt.
    * Clique em "Escolher arquivo" e selecione um documento PDF.
    * Clique em "Gerar resumo" e aguarde a resposta da IA.

---

## 📂 Estrutura do Projeto

```
.
├── .venv/
├── client/
│   ├── public/
│   └── src/
│       ├── index.html
│       ├── index.js
│       └── style.css
├── server/
│   ├── api.py
│   └── .env            (a ser criado)
├── .gitignore
├── como rodar.txt
├── requirements.txt
└── README.md
```

---
