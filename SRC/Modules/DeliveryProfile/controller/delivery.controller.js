import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import { deliveryUpdateSchema } from "./deliveryprofile.validation.js";

export const updateDeliveryProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = deliveryUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
      const id = req.userId;
      const delivery = await delivaryUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!delivery){
        return res.json({message:"user not found !"});
      }
      return res.json({message:"your profile updated successfully",delivery});
    }catch(error){
        return res.json({message:"Error during update the delivery profile !",error:error.stack});
    }
};

export const destroyDelivery = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyDelivery = await delivaryUserModel.findOneAndDelete(id);
        if(!destroyDelivery){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy delivery"});
    }
};