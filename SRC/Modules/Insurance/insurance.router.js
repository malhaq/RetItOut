import { Router } from "express";
import * as InsuranceController from './controller/insurance.controller.js';
import ownerCheckAuth from './../../Middleware/ownerCheckAuth.js';
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";

const router = Router();

router.post('/InsuSub',ownerCheckAuth,InsuranceController.InsuranceSubscrption);
router.post('/InsuUnSub',ownerCheckAuth,InsuranceController.InsuranceUnSubscrption);
router.post('/complaint',renterCheckAuth,InsuranceController.complaint);

export default router;