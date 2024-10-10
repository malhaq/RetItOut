import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const delivaryUserSchema = new Schema({
  userName: {
    type: String,
    requires:true,
  },
  age: {
    type:Number,
  },
  email: {
    type: String,
    requires:true,
  },
  address: {
    type: String,
    requires:true,
  },
  gender: {
   type:String,
   enum:['Male','Female'],
   default:'Male',
  },
  password:{
   type:String,
   required:true
  }
},{
    timestamps:true,
});
const delivaryUserModel = model('delivaryUser',delivaryUserSchema);
export default delivaryUserModel;
