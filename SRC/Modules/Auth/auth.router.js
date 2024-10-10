import { Router } from "express";
import * as AuthController from './controller/auth.controller.js';

const router = Router();

// signup section
router.post('/ownerSignUp',AuthController.ownerSignUp);
router.post('/renterSignUp',AuthController.renterSignUp);
router.post('/deliverySignUp',AuthController.delivarySignUp);
router.post('/adminSignUp',AuthController.adminSignUp);

// signin section
router.post('/ownerSignIp',AuthController.ownerSignin);
router.post('/renterSignIp',AuthController.renterSignin);
router.post('/deliverySignIp',AuthController.delivarySignin);
router.post('/adminSignIp',AuthController.adminSignin);



export default router;