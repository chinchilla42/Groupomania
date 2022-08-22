/* Import Express */
const express = require('express');

/* Create router */
const router = express.Router();

/* Import controllers */
const userCtrl = require ('../controllers/user');

/* Save routes */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.findUser);

/* Export router */
module.exports = router;