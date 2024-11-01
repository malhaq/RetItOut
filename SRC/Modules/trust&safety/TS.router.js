import { Router } from "express";
import * as trustSafety from './controller/TS.controller';
const router = Router()

/**
 * @desc Rate the delivery driver by his id
 * @route /rate/delivery/:id
 * @method PUT
 * @access public
 */
router.put('/delivery/:id',trustSafety.rateDelivery);

/**
 * @desc Rate the ordered item by it's id
 * @route /rate/order/:id
 * @method PUT
 * @access public
 */
 router.put('/order/:id', trustSafety.rateOrder);

export default router;