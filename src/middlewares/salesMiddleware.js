const { productsServices } = require('../services');

const validateProducts = async (req, res, next) => {
  req.body.map(async (item) => {
    const { productId, quantity } = item;
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (quantity <= 0) {
      return res.status(422).json(
        { message: '"quantity" must be greater than or equal to 1' },
        );
    }
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    return next();
  });
};

const validateIds = async (req, res) => {
  const productId = await req.body.map(async (item) => {
    const productExists = await productsServices.getProductById(item.productId);
    return productExists;
  });
  const result = await Promise.all(productId);
  const teste = result.find((item) => (item.type === 'PRODUCT_NOT_FOUND'));
  if (teste.type) return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  validateProducts,
  validateIds,
};