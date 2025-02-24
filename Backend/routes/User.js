const express = require('express');
const router = express();
const { Login , Signup } = require('../controller/auth.js');
router.post('/login', Login);
router.post('/signup', Signup);
module.exports = router;

