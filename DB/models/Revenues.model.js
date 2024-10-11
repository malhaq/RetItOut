import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const RevenueSchema  = new Schema({
    categoryName:{
        type:String,
        enum:['','',''],
        requires:true,
    },
    moneyAmount:{
        type:Number,
        requires:true,
    },
    ownerId:{
        type:String,
        requires:true
    },
    renterId:{
        type:String,
        requires:true
    },
    productId:{
        type:String,
        requires:true,
    },
    rentalDate:{
        type:Date,
        default: Date.now,
        requires:true,
    }
});
const RevenueModel = model('Revenue',RevenueSchema);
export default RevenueModel;