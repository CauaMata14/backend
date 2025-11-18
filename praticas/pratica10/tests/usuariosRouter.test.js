const request = require('supertest');
const app = require('../app');
const Usuario = require('../models/usuariosModel');
const { gerarToken } = require('../middlewares/authMiddleware');

describe('Testes da API de Usuários', () => {
  let userId;
  let authToken;
  
  // Limpar o banco de dados antes de cada teste
  beforeEach(async () => {
    await Usuario.deleteMany({});
  });

  describe('POST /usuarios', () => {
    it('deve criar um novo usuário', async () => {
      const res = await request(app)
        .post('/usuarios')
        .send({
          email: 'test@example.com',
          senha: 'password123'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.email).toBe('test@example.com');
      
      // Salva o ID do usuário para uso em outros testes
      userId = res.body._id;
    });

    it('não deve criar usuário sem email e senha', async () => {
      const res = await request(app)
        .post('/usuarios')
        .send({});
      
      expect(res.statusCode).toEqual(422);
      expect(res.body.msg).toBe('Email e Senha são obrigatórios');
    });
  });

  describe('POST /usuarios/login', () => {
    beforeEach(async () => {
      // Cria um usuário para teste de login
      await Usuario.create({
        email: 'login@test.com',
        senha: '$2a$10$X8z5Jz3XqJmJ4J6J8J6J6e' // Senha: password123
      });
    });

    it('deve fazer login com credenciais válidas', async () => {
      const res = await request(app)
        .post('/usuarios/login')
        .send({
          usuario: 'login@test.com',
          senha: 'password123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      
      // Salva o token para uso em outros testes
      authToken = res.body.token;
    });

    it('não deve fazer login sem credenciais', async () => {
      const res = await request(app)
        .post('/usuarios/login')
        .send({});
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.msg).toBe('Credenciais inválidas');
    });
  });

  describe('POST /usuarios/renovar', () => {
    beforeEach(async () => {
      // Gera um token válido
      authToken = gerarToken({ email: 'test@example.com' });
    });

    it('deve renovar o token JWT', async () => {
      const res = await request(app)
        .post('/usuarios/renovar')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('não deve renovar com token inválido', async () => {
      const res = await request(app)
        .post('/usuarios/renovar')
        .set('Authorization', 'Bearer tokeninvalido');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.msg).toBe('Token inválido');
    });
  });

  describe('DELETE /usuarios', () => {
    beforeEach(async () => {
      // Cria um usuário para teste de remoção
      const user = await Usuario.create({
        email: 'delete@test.com',
        senha: '$2a$10$X8z5Jz3XqJmJ4J6J8J6J6e' // Senha: password123
      });
      
      // Gera um token para o usuário
      authToken = gerarToken({ email: 'delete@test.com' });
    });

    it('deve remover um usuário existente', async () => {
      const res = await request(app)
        .delete('/usuarios')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          usuario: 'delete@test.com'
        });
      
      expect(res.statusCode).toEqual(204);
      
      // Verifica se o usuário foi removido
      const usuario = await Usuario.findOne({ email: 'delete@test.com' });
      expect(usuario).toBeNull();
    });
  });
});
