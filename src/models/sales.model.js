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

module.exports = {
  getAllSales,
  insertSale,
};
