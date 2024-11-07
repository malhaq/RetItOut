import { Router } from "express";
import {rateDelivery,rateItem} from './controller/TS.controller.js';
const router = Router()

/**
 * @desc Rate the delivery driver by his id
 * @route /rate/delivery/:id
 * @method PUT
 * @access public
 */
router.put('/delivery/:id',rateDelivery);

/**
 * @desc Rate the ordered item by it's id
 * @route /rate/order/:id
 * @method PUT
 * @access public
 */
 router.put('/order/:id', rateItem);

export default router;