const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/all', auth, controllers.getAllProfile);
router.get('/own', auth, controllers.getOwnProfile);
router.patch('/edit/:id', auth, controllers.editProfile);
router.patch('/disable/:id', auth, controllers.disableProfile);

module.exports = router