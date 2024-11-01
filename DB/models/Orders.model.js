import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

//define orders sschema
const orderSchema = new Schema({
    itemId: { type:mongoose.Schema.Types.ObjectId, ref: 'itemSchema', required: true},
    renterId: { type:mongoose.Schema.Types.ObjectId, ref: 'renterUserSchema', required: true},
    ownerId: { type:mongoose.Schema.Types.ObjectId, ref: 'ownerUserSchema', required: true},
    rentalPeriod:{
        startDate: {type:Date,required:true},
        endDate:{type:Date,required:true},
    },
    logistics:{
        deliveryOption:{type:String,enum:['pickup', 'delivery'],required:true},
        deliveryAddress: {type:String},
        pickupLocation: {type:String},
    },
    status:{type:String,enum:['booked','active','completed','canceled'],default:'booked'},
    ratings:{
        reating:{type:number,min:0,max:5},
        comment: String,
    },
    
 },{timestamps:true})

 const Orders = mongoose.model('Orders', orderSchema);
 export default Orders;
 