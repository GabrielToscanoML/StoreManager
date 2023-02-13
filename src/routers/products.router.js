const express = require('express');
const { productsModel } = require('../models');

const router = express.Router();

router.get('/products', async (req, res) => {
  const result = await productsModel.getAllProducts();
  return res.status(200).json(result);
});

router.get('/products/:id', async (req, res) => {
  const id = req.params;
  const result = await productsModel.getProductById(id);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Product not found' });
});

module.exports = router;
