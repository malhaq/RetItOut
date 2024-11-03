import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const InsuranceRevenueSchema = new Schema({
  ownerId:{
    type:String,
    requires:true,
  },
  insurenceType:{
    type:String,
    enum:['Basic','Normal','Supper'],
    requires:true,
  },
  amoutOfMoney:{
    type:Number,
    requires:true,
  }
},{
    timestamps:true,
});
const InsuranceRevenueModel = model('InsuranceRevenue',InsuranceRevenueSchema);
export default InsuranceRevenueModel;