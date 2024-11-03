import Orders from '../../../../DB/models/Orders.model.js';
import Item from '../../Item/controller/itemModel.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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
// Delivery driver assgin an order by the order id to him self  
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

// get all the orders that have been ordered by the renter 
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

// external API usage
// Owner can add a pickuplocation for an item by its id using foursquare api
export const addPickUpLocation = async (req, res) => {
    verifyTokenAndOwner(req, res, async () => {
        try {
            const { lat, lng, searchQuery } = req.body;
            const itemId = req.params.id;

            // API endpoint and key
            const foursquareURL = 'https://api.foursquare.com/v3/places/search';
            const apikey = process.env.FOURSQUARE_API_KEY;

            // send request for the api 
            const { data } = await axios.get(foursquareURL, {
                headers: {
                    Authorization: apikey
                },
                params: {
                    query: searchQuery || '',
                    ll: `${lat},${lng}`,
                    limit: 1
                }
            });
            const location = data.results[0];
            if (!location) {
                return res.status(404).json({ message: 'No suggested pickup location found!' });
            }
            const updatedItem = Item.findByIdAndUpdate(
                itemId,
                {
                    'logistics.pickupLocation.name': location.name,
                    'logistics.pickupLocation.address': location.location.formatted_address,
                    'logistics.pickupLocation.coordinates.lat': location.geocodes.main.latitude,
                    'logistics.pickupLocation.coordinates.lng': location.geocodes.main.longitude
                },
                {new:true,runValidators: true}
            );
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.status(201).json({ message: 'Pickup location added successfully', item: updatedItem });



        } catch (error) {
            res.status(500).json({ message: 'Server error coudnot add pickup location', error: error.message });
        }
    });
}

// owner can change the pickup location for a current order by id
export const updateOrderPickupLocation = async (req, res) => {
    verifyTokenAndOwner(req, res, async () => {
        try {
            const { lat, lng, searchQuery } = req.body;
            const OrderId = req.params.id;

            // API endpoint and key
            const foursquareURL = 'https://api.foursquare.com/v3/places/search';
            const apikey = process.env.FOURSQUARE_API_KEY;

            // send request for the api 
            const { data } = await axios.get(foursquareURL, {
                headers: {
                    Authorization: apikey
                },
                params: {
                    query: searchQuery || '',
                    ll: `${lat},${lng}`,
                    limit: 1
                }
            });
            const location = data.results[0];
            if (!location) {
                return res.status(404).json({ message: 'No suggested pickup location found!' });
            }
            const updatedOrder = Orders.findByIdAndUpdate(
                OrderId,
                {
                    'logistics.pickupLocation.name': location.name,
                    'logistics.pickupLocation.address': location.location.formatted_address,
                    'logistics.pickupLocation.coordinates.lat': location.geocodes.main.latitude,
                    'logistics.pickupLocation.coordinates.lng': location.geocodes.main.longitude
                },
                {new:true,runValidators: true}
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(201).json({ message: 'Pickup location added successfully', item: updatedOrder });



        } catch (error) {
            res.status(500).json({ message: 'Server error coudnot add pickup location', error: error.message });
        }
    });
}