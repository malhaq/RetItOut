import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import { ownerUpdateSchema } from "./ownerprofile.validation.js";
import axios from 'axios';
import  jwt  from 'jsonwebtoken';

export const updateOwnerProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = ownerUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const id = req.userId;
      const owner = await ownerUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!owner){
        return res.status(404).json({message:"user not found !"});
      }
      try{
        await axios.post('http://localhost:3000/email/sendEmail',
        {
          to: email,
          subject: "Profile Update Confirmation",
          text: `Dear RentalPlatform User,\n\nYour profile has been updated successfully!\n\nBest regards,\nRental Platform`,
        });
      }catch(error){
        return res.status(500).json({message:"Error during sending the email",error:error.stack});
      }
      return res.status(200).json({message:"your profile updated successfully",owner});
    }catch(error){
        return res.status(500).json({message:"Error during update the owner profile !",error:error.stack});
    }
};

export const destroyOwner = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyOwner = await ownerUserModel.findOneAndDelete(id);
        if(!destroyOwner){
           return res.status(400).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy owner"});
    }
};
