import { Router } from "express";
import * as AuthController from './controller/auth.controller.js';


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

//delete accounts
/**
 * @desc delete admin account by ID only by admins
 * @route /auth/delete/admin/:id
 * @method DELETE
 * @access private
 */
router.delete('/delete/admin/:id',AuthController.deleteAdminAccount);

/**
 * @desc delete renter account by ID from the Admin or the user him self
 * @route /auth/delete/renter/:id
 * @method DELETE
 * @access private
 */
router.delete('/delete/renter/:id',AuthController.deleteRenterAccount);

/**
 * @desc delete owner account by ID from the Admin or the user him self
 * @route /auth/owner/renter/:id
 * @method DELETE
 * @access private
 */
router.delete('/delete/owner/:id',AuthController.deleteOwnerAccount);

/**
 * @desc delete delivery account by ID from the Admin or the user him self
 * @route /auth/delivery/renter/:id
 * @method DELETE
 * @access private
 */
router.delete('/delete/delivery/:id',AuthController.deleteDeliveryAccount);

export default router;