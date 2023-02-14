const express = require('express');
const { getSaleById, getAllSales } = require('../models/sales.model');
// const { insertSale } = require('../models/sales.model');

const router = express.Router();

router.get('/sales', async (_req, res) => {
  const result = await getAllSales();
  return res.status(200).json(result);
});

router.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getSaleById(id);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Sale not found' });
});

// router.post('/sales',
//   async (req, res) => {
//   const reqBody = req.body;
//   const newId = await getAllProducts();
//   const newProduct = {
//     id: newId.length + 1,
//     ...reqBody,
//   };
//     await insertSale(newProduct);
//     return res.status(201).json(newProduct);
//   });

module.exports = router;