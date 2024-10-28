import { Router } from "express";
import * as verification from './controller/verification.controller';
const router = Router()

/**
 * @desc verify the email using otp
 * @route /verification/verify-otp/
 * @method POST
 * @access public
 */
router.post('/verify-otp', verification.verifyOTP);

/**
 * @desc Resend verification OTP
 * @route /verification/resend-otp
 * @method POST
 * @access public
 */
router.post('/resend-otp', verification.resendOTP);
