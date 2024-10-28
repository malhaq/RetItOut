import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    rentalPrice: {
        daily: {
            type: Number,
            required: true,
        },
        weekly: {
            type: Number,
            required: true,
        },
        monthly: {
            type: Number,
            required: true,
        },
    },
    rentalDuration: {
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
    },
}, {
    timestamps: true,
});

const Item = model('Item', itemSchema);
export default Item;
