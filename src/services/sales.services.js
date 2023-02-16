// const { productsServices } = require('.');
const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const insertSale = async (productsList) => {
  const saleID = await salesModel.insertSale();
  // console.log('SALEID', saleID);
  const newSale = {
    id: saleID,
    itemsSold: [...productsList],
  };
  await salesModel.getAllSales();
  // console.log('NEWSALE', newSale);
  return { type: null, message: newSale };
};

module.exports = {
  getAllSales,
  insertSale,
};