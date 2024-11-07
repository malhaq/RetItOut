import { Router } from "express";
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";
import deliveryCheckAuth from "../../Middleware/deliveryCheckAuth.js";
import * as RecomendationController from './controller/recomendation.controller.js';

const router = Router();

router.get('/RecomendedProducts-A',adminCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts-R',renterCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts-O',ownerCheckAuth,RecomendationController.productWithHighRental);
router.get('/recomendedProducts-D',deliveryCheckAuth,RecomendationController.productWithHighRental);

router.post('/nHighProductRental-A/:n',RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental-R/:n',renterCheckAuth,RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental-O/:n',ownerCheckAuth,RecomendationController.nProductWithHighRental);
router.post('/nHighProductRental-D/:n',deliveryCheckAuth,RecomendationController.nProductWithHighRental);

export default  router;