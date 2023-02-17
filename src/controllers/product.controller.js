const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getProductById(id);
  if (result.type) return res.status(404).json(result);
  return res.status(200).json(result.message);
};

const createProduct = async (req, res) => {
  const { message } = await productsServices.insertProduct(req.body);
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsServices.updateProductById(name, id);
  if (result.type) return res.status(404).json(result);
  console.log('result', result.message);
  return res.status(200).json(result.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.deleteProductById(id);
  if (result.type) return res.status(404).json(result);
  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
