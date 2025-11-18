const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);

// Rotas protegidas por autenticação
router.post('/renovar', verificarToken, usuariosController.renovar);
router.delete('/', verificarToken, usuariosController.remover);

module.exports = router;
