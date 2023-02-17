// const { productsServices } = require('.');
const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const insertSale = async (productsList) => {
  const saleID = await salesModel.insertSale();
  const insertProduct = productsList.map(
    (product) => salesModel.insertSalesProducts(saleID, product),
  );
  await Promise.all(insertProduct);
    const newSale = {
    id: saleID,
    itemsSold: [...productsList],
  };
  return newSale;
};

module.exports = {
  getAllSales,
  insertSale,
};