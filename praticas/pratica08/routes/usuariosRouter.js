const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /usuarios/login
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario && senha) {
    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  return res.status(400).json({ msg: 'Usuário ou senha inválidos' });
});

// POST /usuarios/renovar
router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
