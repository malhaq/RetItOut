import delivaryUserModel from '../../../../DB/models/Delivary.model.js';
import {deliveryRatingSchema} from './TS.validation.js';


export const rateDelivery = async (req, res) => {
    const {error} = deliveryRatingSchema(req);
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
//TODO: after rented items record is implemented
}