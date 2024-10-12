import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

//owners
const userFeedbackSchema = new Schema({
   email:{
    type:String,
    requires:true,
   },
   feedback:{
    type:String,
    default:'',
   }
},{ timestamps: true });
const userFeedbackModel = model('userFeedback',userFeedbackSchema);
export default userFeedbackModel;