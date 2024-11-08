import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

//define orders sschema
const orderSchema = new Schema({
    itemId: { type:mongoose.Schema.Types.ObjectId, ref: 'itemSchema', required: true},
    renterId: { type:mongoose.Schema.Types.ObjectId, ref: 'renterUserSchema', required: true},
    ownerId: { type:mongoose.Schema.Types.ObjectId, ref: 'ownerUserSchema', required: true},
    deliveredby:{type:mongoose.Schema.Types.ObjectId, ref: 'delivaryUserSchema',default:null},
    rentalPeriod:{
        startDate: {type:Date,required:true},
        endDate:{type:Date,required:true},
    },
    logistics:{
        deliveryOption:{type:String,enum:['pickup', 'delivery'],required:true,default:'pickup'},
        deliveryAddress: {type:String},
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
    status:{type:String,enum:['booked','active','completed','canceled'],default:'booked'},
    ratings:{
        rating:{type:Number,min:0,max:5},
        comment: String,
    },
    
 },{timestamps:true})

 const Orders = mongoose.model('Orders', orderSchema);
 export default Orders;
 