const express = require('express');
const { salesController } = require('../controllers');
const { validateProducts, validateIds } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSaleById);
router.post('/', validateProducts, validateIds, salesController.createSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
