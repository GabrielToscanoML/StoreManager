const { productsServices } = require('../services');
// const { errorMap } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.getAllProducts();
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductById(id);
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { type, message } = await productsServices.insertProduct(req.body);
  if (type) return res.status(400).json(message);
  return res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
