import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ownerUserSchema = new Schema({
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
  },
  isVerified: {
    type: Boolean,
    default: false
  }
},{
    timestamps:true,
});
const ownerUserModel = model('ownerUser',ownerUserSchema);
export default ownerUserModel;
