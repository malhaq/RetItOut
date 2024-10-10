import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const adminUserSchema = new Schema({
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
  phoneNumber:{
    type:Number,
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
const adminUserModel = model('adminUser',adminUserSchema);
export default adminUserModel;
