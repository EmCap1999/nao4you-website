const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');
const TestsController = require('../controllers/test-controller');
const firebaseAuthController = require('../controllers/firebase-auth-controller');


router.get('/api/test', verifyToken, TestsController.test);
router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
router.post('/api/reset-password', firebaseAuthController.resetPassword);

module.exports = router;