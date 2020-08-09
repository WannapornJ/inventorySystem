const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.post('./register', controllers.register);
router.post('./login', controllers.login);
router.get('/', controllers.getProfile);
router.get('/:id', controllers.getPersonalProfile);
router.patch('/edit/:id', controllers.editProfile);
router.delete('/delete/:id', controllers.deleteProfile);

module.exports = router