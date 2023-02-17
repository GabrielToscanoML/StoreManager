// const { productsServices } = require('.');
const { salesModel } = require('../models');
const { validateId } = require('./validations/validationInputValues');

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

const getSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;
  const sale = await salesModel.getSaleById(saleId);
  if (sale.length > 0) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const deleteSaleById = async (saleId) => {
  const errorId = validateId(saleId);
  if (errorId.type) return errorId;

  const sale = await salesModel.getSaleById(saleId);
  if (sale.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const result = await salesModel.deleteById(saleId);
    if (result) return { type: null, message: result };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  getAllSales,
  insertSale,
  getSaleById,
  deleteSaleById,
};