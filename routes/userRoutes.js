const express = require('express');
const router = express.Router();

const { registerUser, loginUser, userCredits } = require('../controllers/userController');
const userAuth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/credits',userAuth, userCredits);

module.exports = router;
