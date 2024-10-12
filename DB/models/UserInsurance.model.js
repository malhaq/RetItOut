import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserInsuranceSchema = new Schema({
    OwnerId:{
        type:String,
        requires:true,
    },
    InsuranceType:{
       type:String,
       enum:['Basic','Supper'],
       requires:true,
    },
    ProductCovers:{
       type:Number,
       requires:true,
       default:0
    },
    insuProducts:{
      type: [String],
      default: [],
    },
    InsuranceStartDate:{
       type:Date,
       default:Date.now
    },
    InsuranceExpireDate:{
       type:Date,
    },
    // from admin to active or inactive this insurance
    InsuranceValidation:{
      type:Boolean,
      default:true
    },
    Subscribted:{
      type:Boolean,
      default:false
    }
},{
    timestamps:true,
});
const UserInsuranceModel = model('UserInsurance',UserInsuranceSchema);
export default UserInsuranceModel;