import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import { ownerUpdateSchema } from "./ownerprofile.validation.js";
import axios from 'axios';

export const updateOwnerProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = ownerUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
      const id = req.userId;
      const owner = await ownerUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!owner){
        return res.json({message:"user not found !"});
      }
      try{
        await axios.post('http://localhost:3000/email/sendEmail',
        {
          to: email,
          subject: "Profile Update Confirmation",
          text: `Dear RentalPlatform User,\n\nYour profile has been updated successfully!\n\nBest regards,\nRental Platform`,
        });
      }catch(error){
        return res.json({message:"Error during sending the email",error:error.stack});
      }
      return res.json({message:"your profile updated successfully",owner});
    }catch(error){
        return res.json({message:"Error during update the owner profile !",error:error.stack});
    }
};

export const destroyOwner = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyOwner = await ownerUserModel.findOneAndDelete(id);
        if(!destroyOwner){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy owner"});
    }
};

