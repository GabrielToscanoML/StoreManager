const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductById(id);
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { message } = await productsServices.insertProduct(req.body);
  return res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
