const express = require('express');
const { validateProductName } = require('../middlewares/productsMiddleware');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/search', productController.listProductsFiltered);
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);
router.post('/', validateProductName, productController.createProduct);
router.put('/:id', validateProductName, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
