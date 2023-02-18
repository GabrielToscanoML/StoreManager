const express = require('express');
const { salesController } = require('../controllers');
const { validateProducts,
  validateProductsIds, validateSalesIds } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSaleById);
router.post('/', validateProducts, validateProductsIds, salesController.createSale);
router.put('/:id',
  validateProducts, validateProductsIds, validateSalesIds, salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
