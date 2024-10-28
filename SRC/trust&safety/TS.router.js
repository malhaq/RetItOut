import { Router } from "express";
import * as trustSafety from './controller/TS.controller';
const router = Router()
/**
 * @desc Rate the delivery driver by his id
 * @route /rate/delivery/:id
 * @method POST
 * @access public
 */
router.post('/rate/delivery/:id',trustSafety.rateDelivery);