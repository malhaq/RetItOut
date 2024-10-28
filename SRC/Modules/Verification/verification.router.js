const express = require('express');
const router = express.Router();
const verification = require('./controller/verification.controller');


/**
 * @desc verify the email using otp
 * @route /verification/verify-otp/
 * @method POST
 * @access public
 */
router.post('/verification/verify-otp',verification.verifyOTP);

/**
 * @desc Resend verification OTP
 * @route /verification/resend-otp
 * @method POST
 * @access public
 */
router.post('/verification/resend-otp',verification.resendOTP);
