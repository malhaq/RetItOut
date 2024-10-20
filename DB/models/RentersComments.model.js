import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const rentersCommentsSchema = new Schema({
  renterId:{
    type:String,
    requires:true,
  },
  ownerId:{
    type:String,
    requires:true,
  },
  productId:{
    type:String,
    requires:true,
  },
  comment:{
    type:String,
  },
  isQuestion:{
    type:Boolean,
    default:false,
  }
},{
    timestamps:true,
});
const RentersCommentsModel = model('RentersComments',rentersCommentsSchema);
export default RentersCommentsModel;