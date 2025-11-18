const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

const gerarToken = (payload) => {
  try {
    const expiresIn = process.env.JWT_EXPIRES || '1h';
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
};

const cifrarSenha = (senha) => {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
};

const compararSenha = (senha, hash) => {
  return bcrypt.compareSync(senha, hash);
};

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha
};
