const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
    FROM StoreManager.sales INNER JOIN StoreManager.sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY StoreManager.sales_products.sale_id, StoreManager.sales_products.product_id;`,
  );
  return camelize(result);
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

const getSaleById = async (saleId) => {
   const [result] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales INNER JOIN StoreManager.sales_products
    ON sales.id = sales_products.sale_id
    WHERE StoreManager.sales.id = (?)
    ORDER BY StoreManager.sales_products.sale_id, StoreManager.sales_products.product_id;`,
     [saleId],
  );
  return camelize(result);
};

module.exports = {
  getAllSales,
  insertSale,
  insertSalesProducts,
  getSaleById,
};
