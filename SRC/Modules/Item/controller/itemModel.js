import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rentalPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    rentalDuration: {
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        }
    },
    pricingModel: {
        type: String,
        enum: ['hourly', 'daily', 'weekly'],
        default: 'daily',
    },
    availability: {
        type: Boolean,
        default: true, 
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
