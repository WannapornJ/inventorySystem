const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products');

router.post('/new', controllers.newProduct);
router.get('/', controllers.getAllProduct);
router.get('/:id', controllers.getOneProduct);
router.patch('/editDetail/:id', controllers.editProduct);
router.delete('/delete/:id', controllers.deleteProduct);

router.post('/import/new/:product_id', controllers.newImportQuantity);
router.get('/import/amount/:product_id', controllers.getAllImportQuantity);
router.get('/import/amount/:product_id/:id', controllers.getOneImportQuantity);
router.patch('/import/amount/:product_id/:id', controllers.updateImportQuantity);

router.get('/export/amount/:product_id', controllers.newExportQuantity);
router.get('/export/amount/:product_id', controllers.getAllExportQuantity);
router.get('/export/amount/:product_id/:id', controllers.getOneExportQuantity);
router.patch('/export/amount/:product_id/:id', controllers.updateExportQuantity);

module.exports = router;