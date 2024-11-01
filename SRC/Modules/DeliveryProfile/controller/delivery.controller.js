import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import { deliveryUpdateSchema } from "./deliveryprofile.validation.js";

export const updateDeliveryProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = deliveryUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const id = req.userId;
      const delivery = await delivaryUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!delivery){
        return res.status(404).json({message:"user not found !"});
      }
      return res.status(200).json({message:"your profile updated successfully",delivery});
    }catch(error){
        return res.status(500).json({message:"Error during update the delivery profile !",error:error.stack});
    }
};

export const destroyDelivery = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyDelivery = await delivaryUserModel.findOneAndDelete(id);
        if(!destroyDelivery){
           return res.status(404).json({message:"user nor found"});
        }
        return res.status(404).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy delivery"});
    }
};