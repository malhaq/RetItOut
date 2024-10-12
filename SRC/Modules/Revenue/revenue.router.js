import { Router } from "express";
import * as RevenueController from '../Revenue/controller/revenue.controller.js'
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";

const router = Router();

router.get('/Revenue',adminCheckAuth,RevenueController.getRevenues);
router.get('/CatRev',adminCheckAuth,RevenueController.getCatRevenues);
router.post('/newRevenue',adminCheckAuth,RevenueController.newRevenue);

export default router;