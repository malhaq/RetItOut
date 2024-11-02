import Orders from '../../../../DB/models/Orders.model.js';

// middle ware for verifying the token and the user type
import userVerification from '../../../Middleware/userVerification.js';
const { verifyTokenAndDelivery, verifyTokenAndRenter, verifyTokenAndOwner } = userVerification;

// Show all the orders that needs to be delivered but not assigned to any one
export const getUndeliveredOrders = async (req, res) => {
    verifyTokenAndDelivery(req, res, async () => {
        try {
            const undeliveredOrders = await Orders.find({
                deliveredby: null,
                'logistics.deliveryOption': 'delivery'
            })
                .select('_id logistics.deliveryAddress itemId renterId')
                .populate('renterId', 'userName phoneNumber')
                .populate('itemId', 'name ');
            res.json(undeliveredOrders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
}
// Delivery driver assgin an order by the orer id to him self  
export const assignToMySelf = async (req, res) => {
    verifyTokenAndDelivery(req, res, async () => {
        try {
            const orederId = req.params.id;
            const updatedOrder = await Orders.findByIdAndUpdate(
                orderId,
                { deliveredby: req.user.id },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order assigned successfully', order: updatedOrder });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    })
}
// Mark the order as delivered
export const markAsDelivered = async (req, res) => {
    verifyTokenAndDelivery(req, res, async () => {
        try {
            const orderId = req.params.id;
            const updatedOrder = await Orders.findByIdAndUpdate(
                orderId,
                { status: 'active' },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }

    })
}
// show all the assigned and undelivered orders
export const getMyUndelivered = async (req, res) => {
    verifyTokenAndDelivery(req, res, async () => {
        try {
            const undeliveredOrders = await Orders.find({
                deliveredby: req.user.id,
                'status': 'booked'
            })
                .select('_id logistics.deliveryAddress itemId renterId')
                .populate('renterId', 'userName phoneNumber')
                .populate('itemId', 'name ');
            res.json(undeliveredOrders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
}
// Show all the orders delivered and undelivered
export const getAllOrders = async (req, res) => {
    verifyTokenAndDelivery(req, res, async () => {
        try {
            const orders = await Orders.find({
                deliveredby: req.user.id
            })
                .select('_id status logistics.deliveryAddress itemId renterId ')
                .populate('renterId', 'userName phoneNumber')
                .populate('itemId', 'name ');
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
}

// get all the orders that have been ordered ny the renter 
export const getUserOrders = async (req, res) => {
    verifyTokenAndRenter(req, res, async () => {
        try {
            const myOrders = await Orders.find({
                renterId: req.user.id
            })
                .select('_id status deliveredby logistics.deliveryOption itemId ownerId ')
                .populate('deliveredby', 'userName email')
                .populate('itemId', 'name ')
                .populate('ownerId', 'name phoneNumber');
            res.json(myOrders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
}

// Owner can add a pickuplocation using foursquare api
export const addPickUpLocation = async (req, res) => {
    verifyTokenAndOwner(req,res,async()=>{
        //TODO: add the pickuplocation
    });
}