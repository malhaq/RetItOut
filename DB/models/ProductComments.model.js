import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ProductCommentssSchema = new Schema({
  renterId:{
    type:String,
    requires:true,
  },
  productId:{
    type:String,
    requires:true,
  },
  comment:{
    type:String,
  }
},{
    timestamps:true,
});
const ProductCommentsModel = model('ProductComments',ProductCommentssSchema);
export default ProductCommentsModel;