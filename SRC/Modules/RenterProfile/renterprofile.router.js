import { Router } from "express";
import * as RenterController from './controller/renterprofile.controller.js'
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";

const router = Router();

router.put('/',renterCheckAuth,RenterController.updateRenterProfile);
router.delete('/',renterCheckAuth,RenterController.destroyRenter);

// get all available items in the item categors
router.get('/cats',RenterController.searchCatProducts);

// filter items based on item names
router.post('/checkItem',RenterController.searchProductName);

export default router;