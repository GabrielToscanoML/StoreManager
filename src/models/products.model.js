const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (productId) => {
  const { id } = productId;
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};
