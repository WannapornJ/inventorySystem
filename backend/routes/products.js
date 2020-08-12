const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products');
const passport = require('passport');

const auth = passport.authenticate('jwt', {session:false});

router.post('/new', auth, controllers.newProduct);
router.get('/', auth, controllers.getAllProduct);
router.get('/:id', auth, controllers.getOneProduct);
router.patch('/editDetail/:id', auth, controllers.editProduct);
router.delete('/delete/:id', auth, controllers.deleteProduct);

router.post('/import/new/:product_id', auth, controllers.newImportQuantity);
router.get('/import/amount/:product_id', auth, controllers.getAllImportQuantity);
router.get('/import/amount/:product_id/:id', auth, controllers.getOneImportQuantity);
router.patch('/import/amount/:product_id/:id', auth, controllers.updateImportQuantity);

router.get('/export/amount/:product_id', auth, controllers.newExportQuantity);
router.get('/export/amount/:product_id', auth, controllers.getAllExportQuantity);
router.get('/export/amount/:product_id/:id', auth, controllers.getOneExportQuantity);
router.patch('/export/amount/:product_id/:id', auth, controllers.updateExportQuantity);

module.exports = router;