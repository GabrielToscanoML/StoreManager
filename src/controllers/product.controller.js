const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getProductById(id);
  console.log('CONTROLLER RESUULT', result);
  if (result.type) return res.status(404).json(result);
  return res.status(200).json(result.message);
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
