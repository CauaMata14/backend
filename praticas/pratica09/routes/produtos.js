const express = require('express');
const router = express.Router();

let produtos = [
  { id: "1", nome: "Camiseta", preco: 49.9 },
  { id: "2", nome: "Caneca", preco: 19.5 }
];
let nextId = 3;

router.get('/', (req, res) => {
  res.status(200).json(produtos);
});

router.post('/', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }
  const novo = { id: String(nextId++), nome, preco };
  produtos.push(novo);
  res.status(201).json(novo);
});

router.get('/:produtoId', (req, res) => {
  const produto = produtos.find(p => p.id === req.params.produtoId);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.status(200).json(produto);
});

router.put('/:produtoId', (req, res) => {
  const { produtoId } = req.params;
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }
  const index = produtos.findIndex(p => p.id === produtoId);
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  produtos[index] = { id: produtoId, nome, preco };
  res.status(200).json(produtos[index]);
});

router.delete('/:produtoId', (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.produtoId);
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  produtos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
