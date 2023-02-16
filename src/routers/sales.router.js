const express = require('express');
// const { validateProductName } = require('../middlewares/productsServices');
const { salesController } = require('../controllers');
const { validateProducts, validateIds } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.listSales);
router.post('/', validateProducts, validateIds, salesController.createSale);

module.exports = router;
