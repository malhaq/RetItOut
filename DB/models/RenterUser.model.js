import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const renterUserSchema = new Schema({
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
const renterUserModel = model('renterUser',renterUserSchema);
export default renterUserModel;
