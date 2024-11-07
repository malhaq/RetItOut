import { Router } from "express";
import * as verification from './controller/verification.controller.js';
const router = Router()

/**
 * @desc verify the email using otp
 * @route /verification/verify-otp/
 * @method PUT
 * @access public
 */
router.put('/verify-otp', verification.verifyOTP);

/**
 * @desc Resend verification OTP
 * @route /verification/resend-otp
 * @method POST
 * @access public
 */
router.post('/resend-otp', verification.resendOTP);

export default router;