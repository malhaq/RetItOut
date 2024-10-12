import { Router } from "express";
import * as RenterController from './controller/renterprofile.controller.js'
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";

const router = Router();

router.put('/',renterCheckAuth,RenterController.updateRenterProfile);
router.delete('/',renterCheckAuth,RenterController.destroyRenter);

export default router;