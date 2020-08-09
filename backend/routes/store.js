const express = require('express');
const router = express.Router();
const controllers = require('../controllers/store');

router.post('/create', controllers.createNewStore);
router.get('/', controllers.getStoreProfile);
router.delete('/remove/:id', controllers.removeStore);

module.exports = router;