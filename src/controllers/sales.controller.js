const { salesServices } = require('../services');

const listSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const message = await salesServices.insertSale(req.body);
  return res.status(201).json(message);
};

module.exports = {
  listSales,
  createSale,
};
