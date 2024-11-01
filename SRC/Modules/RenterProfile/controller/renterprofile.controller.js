import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import { renterUpdateSchema } from "./renterprofile.validation.js";

export const updateRenterProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = renterUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const id = req.userId;
      const renter = await renterUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!renter){
        return res.status(404).json({message:"user not found !"});
      }
      return res.status(200).json({message:"your profile updated successfully",renter});
    }catch(error){
        return res.status(500).json({message:"Error during update the renter profile !",error:error.stack});
    }
};

export const destroyRenter = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyRenter = await renterUserModel.findOneAndDelete(id);
        if(!destroyRenter){
           return res.status(400).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy renter"});
    }
};

// filters section

export const searchCatProducts = async (req,res)=>{
   try{
    
   }catch(error){
     return res.json({message:"Error during the search Cat. produect !",error:error.stack});
   }
};

export const searchProductName = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during the search produect name !",error:error.stack});
  }
};
