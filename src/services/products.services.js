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
  const newId = await productsModel.getAllProducts();
  const newProduct = {
    id: newId.length + 1,
    ...name,
  };
  if (error.type) return error;
  await productsModel.insertProduct(newProduct);
  await productsModel.getProductById(newProduct);
  return { type: null, message: newProduct };
};

const updateProductById = async (productName, productId) => {
  const errorId = validateId(productId);
  if (errorId.type) return errorId;

  await productsModel.updateById(productName, productId);
  const newProduct = await productsModel.getProductById(productId);
    if (newProduct) return { type: null, message: newProduct };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const deleteProductById = async (productId) => {
  const errorId = validateId(productId);
  if (errorId.type) return errorId;

  const product = await productsModel.getProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const result = await productsModel.deleteById(productId);
    if (result) return { type: null, message: result };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
};