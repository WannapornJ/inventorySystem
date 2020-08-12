const express = require('express');
const router = express.Router();
const controllers = require('../controllers/store');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.post('/create', auth, controllers.createNewStore);
router.get('/', auth, controllers.getStoreProfile);
router.delete('/remove/:id', auth, controllers.removeStore);

module.exports = router;