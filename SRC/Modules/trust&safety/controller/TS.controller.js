import delivaryUserModel from '../../../../DB/models/Delivary.model.js';
import Order from '../../../../DB/models/Orders.model.js';
import { deliveryRatingSchema, orderRatingSchema } from './TS.validation.js';


export const rateDelivery = async (req, res) => {
    const { error } = deliveryRatingSchema(req);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { orderid, rating, comment } = req.body;
    try {
        const delivery = await delivaryUserModel.findById(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery driver not found' });
        }
        delivery.ratings.push({ orderid, rating, comment });
        await delivery.save();
        res.json({ message: 'Rating has been added for order' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const rateItem = async (req, res) => {
    const { error } = orderRatingSchema(req);// validate req data 
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { orderid, rating, comment } = req.body;
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: {
                    'ratings.rating': rating,
                    'ratings.comment': comment
                }
            },
            { new: true }
        );
        if (!updateOrder) {
            return res.status(404).json({ message: 'Order not found' });
        };
        res.status(200).json({
            message: 'Rating added successfully',
            order: updateOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}