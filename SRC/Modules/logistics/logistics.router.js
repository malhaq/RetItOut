import { Router } from "express";
import * as logistic from './controller/logistics.controller.js'
const router = Router()

/**
 * @desc get all the orders that needs to be delivered but not assigned to any
 * @route /logistic/delivery/unassigned/
 * @method GET
 * @access private
 */
router.get('/delivery/unassigned',logistic.getUndeliveredOrders);

/**
 * @desc delivery driver assgin an order by the order id to him self
 * @route /logistic/delivery/:id/assigned/
 * @method PUT
 * @access private
 */
router.put('/delivery/:id/assigned/',logistic.assignToMySelf);

/**
 * @desc mark an order by id as delivered 
 * @route /logistic/delivery/:id/delivered/
 * @method PUT
 * @access private
 */
router.put('/delivery/:id/delivered/',logistic.markAsDelivered);

/**
 * @desc get all driver's undelivered orders 
 * @route /logistic/delivery/tobe-delivered/
 * @method GET
 * @access private
 */
router.get('/delivery/tobe-delivered/',logistic.getMyUndelivered);

/**
 * @desc get all delivery's orders the delivered and not yet delivered
 * @route /logistic/delivery/my-orders/
 * @method GET
 * @access private
 */
router.get('/delivery/my-orders/',logistic.getAllOrders);

/**
 * @desc get all orders placed by a specific renter
 * @route /logistic/my-orders/
 * @method GET
 * @access private
 */
router.get('/my-orders/',logistic.getUserOrders);

/**
 * @desc add or update the pickup location for an item
 * @route /logistic/:id/pickup/
 * @method POST
 * @access private
 */
router.post('/:id/pickup/',logistic.addPickUpLocation);

/**
 * @desc update the pickup location for an order
 * @route /logistic/:id/order-pickup/
 * @method PUT
 * @access private
 */
router.put('/:id/order-pickup/',logistic.updateOrderPickupLocation);


export default router;