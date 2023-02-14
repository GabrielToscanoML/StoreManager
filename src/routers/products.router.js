const express = require('express');
const { insertProduct, getProductById, getAllProducts } = require('../models/products.model');

const router = express.Router();

router.get('/products', async (req, res) => {
  const result = await getAllProducts();
  return res.status(200).json(result);
});

router.get('/products/:id', async (req, res) => {
  const id = req.params;
  const result = await getProductById(id);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Product not found' });
});

router.post('/products', async (req, res) => {
    const reqBody = req.body;
    await insertProduct(reqBody);
    return res.status(201).json(reqBody);
  });

module.exports = router;
