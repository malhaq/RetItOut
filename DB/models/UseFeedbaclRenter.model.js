import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

//renters
const userRenterFeedbackSchema = new Schema({
   email:{
    type:String,
    requires:true,
   },
   feedback:{
    type:String,
    default:'',
   }
},{ timestamps: true });
const userRenterFeedbackModel = model('userRenterFeedback',userRenterFeedbackSchema);
export default userRenterFeedbackModel;