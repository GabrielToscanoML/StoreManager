const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return result;
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ();');
  return insertId;
};

const insertSalesProducts = async (saleId, productInfo) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productInfo.productId, productInfo.quantity],
  );
  return insertId;
};

module.exports = {
  getAllSales,
  insertSale,
  insertSalesProducts,
};
