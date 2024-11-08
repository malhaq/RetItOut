import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ownerUserSchema', required: true
    },
    description: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    logistics:{
        deliveryOption:{type:String, enum:['pickup', 'delivery'], required:true,default:'pickup'},
        pickupLocation: {
            type:{
                name:String,
                address:String,
                coordinates: {
                    lat: Number,
                    lng: Number
                }
            }
            
        },
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
        startDate: Date,
        endDate: Date,
    },
}, {
    timestamps: true,
});

const Item = model('Item', itemSchema);
export default Item;