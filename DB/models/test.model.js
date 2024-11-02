import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const testSchema = new Schema({
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
  }
},{
    timestamps:true,
});
const testModel = model('test',testSchema);
export default testModel;