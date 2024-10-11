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

export default router;