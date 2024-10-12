import { Router } from "express";
import * as DeliveryController from './controller/delivery.controller.js'
import deliveryCheckAuth from "../../Middleware/deliveryCheckAuth.js";

const router = Router();

router.put('/',deliveryCheckAuth,DeliveryController.updateDeliveryProfile);
router.delete('/',deliveryCheckAuth,DeliveryController.destroyDelivery);

export default router;