import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const OwnerReviwsCommentsSchema = new Schema({
  ownerId:{
    type:String,
    requires:true,
  },
  renterId:{
    type:String,
    requires:true,
  },
  productId:{
    type:String,
    requires:true,
  },
  answer:{
    type:String,
    requires:true,
  },
},{
    timestamps:true,
});
const OwnerReviwsCommentsModel = model('OwnerReviwsComments',OwnerReviwsCommentsSchema);
export default OwnerReviwsCommentsModel;