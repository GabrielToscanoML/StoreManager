const { productsServices, salesServices } = require('../services');

const verifyExistence = (productsList) => {
  const result = productsList.map((item) => {
    const { productId, quantity } = item;
    if (!productId) return ({ type: 400, message: '"productId" is required' });
    if (quantity <= 0) {
      return ({ type: 422, message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) return ({ type: 400, message: '"quantity" is required' });
    return ({ type: null, message: productsList });
  });
  return result;
};

const validateProducts = (req, res, next) => {
  const result = verifyExistence(req.body);
  const searchError = result.every((item) => item.type === null);
  const error = result.find((errorType) => errorType.type > 300);
  if (!searchError) return res.status(error.type).json(error);
  return next();
};

const validateProductsIds = async (req, res, next) => {
  const productId = req.body.map((product) => productsServices.getProductById(product.productId));
  const result = await Promise.all(productId);
  const erro = result.some((product) => product.type !== null);
  if (erro) return res.status(404).json({ message: 'Product not found' });
  return next();
};

const validateSalesIds = async (req, res, next) => {
  const { id } = req.params;
  const getSaleIfExists = await salesServices.getSaleById(id);
  if (getSaleIfExists.type) return res.status(404).json({ message: 'Sale not found' });
  return next();
};

module.exports = {
  validateProducts,
  validateProductsIds,
  validateSalesIds,
};