const { salesServices } = require('../services');

const listSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const message = await salesServices.insertSale(req.body);
  return res.status(201).json(message);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getSaleById(id);
  if (result.type) return res.status(404).json(result);
  return res.status(200).json(result.message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.updateSaleById(id, req.body);
  if (result.type) return res.status(404).json(result);
  return res.status(200).json(result.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteSaleById(id);
  if (result.type) return res.status(404).json(result);
  return res.status(204).end();
};

module.exports = {
  listSales,
  createSale,
  listSaleById,
  deleteSale,
  updateSale,
};
