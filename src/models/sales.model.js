const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return result;
};

const getSaleById = async (saleId) => {
  // const { id } = saleId;
  console.log('saleId: ', saleId);
  const [sale] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return sale[0];
};

const insertSale = async (product) => {
  const productInfo = await connection.execute(
    'INSERT INTO StoreManager.sales (name) VALUES (?)',
    [product],
  );
  return productInfo;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};
