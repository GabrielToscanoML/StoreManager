const express = require('express');
const { salesController } = require('../controllers');
const { validateProducts, validateIds } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.listSales);
router.post('/', validateProducts, validateIds, salesController.createSale);

module.exports = router;
