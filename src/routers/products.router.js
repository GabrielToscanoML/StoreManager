const express = require('express');
const { validateProductName } = require('../middlewares/productsServices');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);
router.post('/', validateProductName, productController.createProduct);
router.put('/:id', validateProductName, productController.updateProduct);

module.exports = router;
