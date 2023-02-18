const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product[0];
};

const insertProduct = async (product) => {
  const productInfo = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  return productInfo;
};

const updateById = async (productName, productId) => connection.execute(
  'UPDATE StoreManager.products SET name = ? WHERE id = ?',
  [productName, productId],
);

const deleteById = async (productId) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?',
  [productId],
);

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateById,
  deleteById,
};
