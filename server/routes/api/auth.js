const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController')

router.post('/token', authController.authenticateUser);

router.post('/refresh', authController.getRefreshedAccessToken);

module.exports = router;