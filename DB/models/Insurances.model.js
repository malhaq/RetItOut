import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const insurancesSchema = new Schema({
    insuName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    coveredProductsNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    // this duration considered in month
    coverageDuration: {
        type: Number,
        required: true,
    },
    active:{
        type:Boolean,
        default:true
    }
},{ timestamps: true });
const insurancesModel = model('insurances',insurancesSchema);
export default insurancesModel;