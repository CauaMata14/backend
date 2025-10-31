const jwt = require('jsonwebtoken');

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ msg: 'Não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

// Função para gerar token
function gerarToken(payload) {
  const expiresIn = 120; // segundos
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = { verificarToken, gerarToken };
