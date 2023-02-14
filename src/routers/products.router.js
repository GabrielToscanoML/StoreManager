const express = require('express');
const { validateProductName } = require('../middlewares/productsServices');
const { insertProduct, getProductById, getAllProducts } = require('../models/products.model');

const router = express.Router();

router.get('/products', async (_req, res) => {
  const result = await getAllProducts();
  return res.status(200).json(result);
});

router.get('/products/:id', async (req, res) => {
  const id = req.params;
  const result = await getProductById(id);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Product not found' });
});

router.post('/products',
  validateProductName,
  async (req, res) => {
  const reqBody = req.body;
  const newId = await getAllProducts();
  const newProduct = {
    id: newId.length + 1,
    ...reqBody,
  };
    await insertProduct(newProduct);
    return res.status(201).json(newProduct);
  });

module.exports = router;