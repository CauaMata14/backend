const Usuario = require('../models/usuariosModel');
const { gerarToken, cifrarSenha, compararSenha } = require('../middlewares/authMiddleware');

const criar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }
    
    const senhaCifrada = cifrarSenha(senha);
    const novoUsuario = await Usuario.create({ email, senha: senhaCifrada });
    
    return res.status(201).json({ 
      _id: novoUsuario._id, 
      email: novoUsuario.email 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ msg: 'Este e-mail já está em uso' });
    }
    return res.status(500).json({ msg: 'Erro ao criar usuário', error: error.message });
  }
};

const entrar = async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    
    if (!usuario || !senha) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    
    const usuarioEncontrado = await Usuario.findOne({ email: usuario });
    
    if (!usuarioEncontrado) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    
    const senhaValida = compararSenha(senha, usuarioEncontrado.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    
    const token = gerarToken({ email: usuarioEncontrado.email });
    
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao realizar login', error: error.message });
  }
};

const renovar = (req, res) => {
  try {
    const token = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao renovar token', error: error.message });
  }
};

const remover = async (req, res) => {
  try {
    const { usuario } = req.body;
    
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuário não informado' });
    }
    
    await Usuario.findOneAndDelete({ email: usuario });
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao remover usuário', error: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao listar usuários', error: error.message });
  }
};

module.exports = {
  listar,
  criar,
  entrar,
  renovar,
  remover
};
