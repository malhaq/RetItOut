import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserComplaintSchema = new Schema({
     renterId:{
        type:String,
        requires: true,
     },
     ProductId:{
        type:String,
       requires: true,
     },
     Msg:{
        type:String,
        requires: true,
     },
     MsgStatus:{
        type:String,
        enum:['Pending','Rejected','Approved'],
        default:'Pending'
     }
},{
    timestamps:true,
});
const UserComplaintModel = model('UserComplaint',UserComplaintSchema);
export default UserComplaintModel;