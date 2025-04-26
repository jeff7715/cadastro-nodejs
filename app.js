// Importa as dependências necessárias
const express = require('express');
const bcrypt = require('bcrypt');

// Cria uma instância do Express
const app = express();

// Configura o middleware para ler JSON no corpo das requisições
app.use(express.json());

// Array em memória para armazenar usuários cadastrados
const usuarios = [];

app.get('/', async (req, res) => {
  res.json(usuarios)
})

// Rota POST para cadastro de novos usuários
app.post('/register', async (req, res) => {
  try {
    // Extrai os dados enviados no corpo da requisição
    const { nome, sobrenome, email, telefone, senha } = req.body;

    // Verifica se todos os campos obrigatórios foram informados
    if (!nome || !sobrenome || !email || !telefone || !senha) {
      return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
    }

    // Verifica se o email já está cadastrado no array
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'Email já cadastrado.' });
    }

    // Criptografa a senha com bcrypt
    const saltRounds = 10; // Número de rounds de criptografia
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    // Cria objeto de novo usuário (sem a senha em texto puro)
    const novoUsuario = {
      nome,
      sobrenome,
      email,
      telefone,
      senha: senhaCriptografada
    };

    // Armazena o usuário no array em memória
    usuarios.push(novoUsuario);

    // Retorna sucesso (status 201 Created)
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    // Em caso de erro interno (por exemplo, falha na criptografia)
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno ao cadastrar usuário.' });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
