import { Router } from "express";
import * as AuthController from './controller/auth.controller.js';
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";

const router = Router();

// signup section
router.post('/ownerSignUp',AuthController.ownerSignUp);
router.post('/renterSignUp',AuthController.renterSignUp);
router.post('/deliverySignUp',AuthController.delivarySignUp);
router.post('/adminSignUp',AuthController.adminSignUp);

// signin section
router.post('/ownerSignIn',AuthController.ownerSignin);
router.post('/renterSignIn',AuthController.renterSignin);
router.post('/deliverySignIn',AuthController.delivarySignin);
router.post('/adminSignIn',AuthController.adminSignin);

// forget password router
router.post('/oForgetPassword',AuthController.oforgetPassword);
router.post('/rForgetPassword',AuthController.rforgetPassword);
router.post('/dForgetPassword',AuthController.dforgetPassword);
router.post('/aForgetPassword',AuthController.aforgetPassword);

// otp code  verification
router.post('/verifyOTP',AuthController.verifyOTPCode);

// update the password
router.post('/resetPassword',AuthController.resetPassword);

export default router;