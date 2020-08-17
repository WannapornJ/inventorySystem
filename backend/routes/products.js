const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products');
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

router.post('/new', auth, controllers.newProduct);
router.get('/', auth, controllers.getAllProduct);
router.patch('/editDetail/:product_id', auth, controllers.editProduct);

router.post('/import/new/:product_id', auth, controllers.newImportQuantity);
router.get('/import/amount/:product_id', auth, controllers.getOneImportQuantity);
router.patch('/import/amount/:product_id/:record_id', auth, controllers.updateImportQuantity);

router.post('/export/new/:product_id', auth, controllers.newExportQuantity);
router.get('/export/amount/:product_id', auth, controllers.getOneExportQuantity);
router.patch('/export/amount/:product_id/:record_id', auth, controllers.updateExportQuantity);

router.get('/exist-all-quantity', auth, controllers.exist);
router.get('/existQuantity/:product_id', auth, controllers.getExistQuantity);
router.get('/:id', auth, controllers.getOneProduct);

module.exports = router;