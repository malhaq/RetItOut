const express = require('express');
const router = express.Router();
const verification = require('./controller/verification.controller');

router.post('/verification/verify-otp',verification.verifyOTP);
router.post('/verification/resend-otp',verification.resendOTP);