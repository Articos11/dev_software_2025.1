const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// 2. Configuração inicial do servidor
const app = express(); // 'app' é a nossa instância do servidor Express
const PORT = 3001; // A porta em que nosso backend vai rodar. É comum usar portas acima de 3000 para servidores de desenvolvimento.

// 3. Middlewares: "Plugins" que nosso servidor vai usar
app.use(express.json()); // Permite que nosso servidor entenda requisições com corpo no formato JSON (essencial para receber dados do frontend)
app.use(cors()); // Habilita o CORS para permitir requisições do nosso frontend

// 4. Conexão com o Banco de Dados SQLite
// Isso vai criar um arquivo chamado 'resumeai.db' na sua pasta 'backend' para armazenar os dados.
const db = new sqlite3.Database('./resumeai.db', (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    // Cria a tabela de usuários se ela não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Erro ao criar a tabela:", err.message);
      } else {
        console.log("Tabela 'users' pronta.");
      }
    });
  }
});

// 5. Rota de Teste: Vamos criar uma rota inicial só para ver se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('<h1>API do ResumeAI está funcionando!</h1>');
});


// Importa o bcrypt para a segurança das senhas
const bcrypt = require('bcrypt');

// 7. ENDPOINT DE CADASTRO (POST /register)
app.post('/register', (req, res) => {
  // Pega os dados enviados pelo frontend no corpo (body) da requisição
  const { name, email, password, role } = req.body;

  // Validação simples para garantir que todos os campos foram enviados
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
  }

  // Validação de força da senha
  const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!senhaForteRegex.test(password)) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.' });
  }

  // Criptografa a senha antes de salvar no banco de dados
  const saltRounds = 10; // Custo do processamento do hash
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criptografar a senha.' });
    }

    // Prepara o comando SQL para inserir o novo usuário
    const sql = `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
    const params = [name, email, hash, role];

    // Executa o comando SQL
    db.run(sql, params, function(err) {
      if (err) {
        // Verifica se o erro é por e-mail duplicado (UNIQUE constraint)
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
        }
        return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
      }

      // Se tudo deu certo, retorna uma mensagem de sucesso
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: this.lastID });
    });
  });
});


// 8. ENDPOINT DE LOGIN (POST /login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, forneça e-mail e senha.' });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  
  // Procura o usuário no banco de dados pelo e-mail
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
    // Se o usuário não for encontrado...
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // Se o usuário for encontrado, compara a senha enviada com o hash salvo no banco
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao autenticar.' });
      }

      if (result) {
        // A senha corresponde! Login bem-sucedido.
        // Em uma aplicação real, aqui você geraria um Token (JWT).
        // Por agora, vamos retornar os dados do usuário (sem o hash da senha).
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        res.status(200).json({ message: 'Login bem-sucedido!', user: userData });
      } else {
        // A senha não corresponde.
        res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }
    });
  });
});


// --- FIM DO NOVO CÓDIGO ---

// 6. Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta http://localhost:${PORT}`);
});