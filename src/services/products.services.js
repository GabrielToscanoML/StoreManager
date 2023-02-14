const { productsModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationInputValues');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getProductById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productsModel.insertProduct({ name });
  const newProduct = await productsModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};