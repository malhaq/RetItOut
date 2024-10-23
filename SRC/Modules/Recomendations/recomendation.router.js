import { Router } from "express";
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";
import deliveryCheckAuth from "../../Middleware/deliveryCheckAuth.js";
import * as RecomendationController from './controller/recomendation.controller.js';

const router = Router();

router.get('/recomendedProducts',adminCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts',renterCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts',ownerCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts',deliveryCheckAuth,RecomendationController.productWithHighRental);

router.post('/nHighProductRental:id',adminCheckAuth,RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental:id',renterCheckAuth,RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental:id',ownerCheckAuth,RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental:id',deliveryCheckAuth,RecomendationController.nProductWithHighRental);

export default  router;