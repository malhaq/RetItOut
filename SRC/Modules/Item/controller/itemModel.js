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
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
