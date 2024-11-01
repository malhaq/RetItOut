import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import { adminUpdateSchema } from "./adminprofile.validation.js";
import { ownerUpdateSchema } from "../../OwnerProfile/controller/ownerprofile.validation.js";
import { renterUpdateSchema } from "../../RenterProfile/controller/renterprofile.validation.js";
import { deliveryUpdateSchema } from "../../DeliveryProfile/controller/deliveryprofile.validation.js";
import userFeedbackModel from "../../../../DB/models/userFeedback.model.js";
import userRenterFeedbackModel from "../../../../DB/models/UseFeedbaclRenter.model.js";
import { json } from "express";
import UserComplaintModel from "../../../../DB/models/UserComplaint.model.js";
import axios from 'axios';
import Item from "../../Item/controller/itemModel.js";

export const updateAdminProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = adminUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const id = req.userId;
      const admin = await adminUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!admin){
        return res.status(404).json({message:"user not found !"});
      }
      return res.status(200).json({message:"your profile updated successfully",admin});
    }catch(error){
        return res.status(500).json({message:"Error during update the admin profile !",error:error.stack});
    }
};

export const destroyAdmin = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyAdmin = await adminUserModel.findOneAndDelete(id);
        if(!destroyAdmin){
           return res.status(404).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy admin"});
    }
};

// for another application users control
export const updateOwnerProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = ownerUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const owner = await ownerUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!owner){
        return res.status(404).json({message:"user not found !"});
      }
      return res.status(200).json({message:"your profile updated successfully",owner});
    }catch(error){
        return res.status(500).json({message:"Error during update the owner profile !",error:error.stack});
    }
};

export const destroyOwner = async (req,res)=>{
    try{
        const {id} = req.body;
        const destroyOwner = await ownerUserModel.findOneAndDelete(id);
        if(!destroyOwner){
           return res.status(404).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy owner"});
    }
};

export const updateRenterProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = renterUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
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
        const {id} = req.body;
        const destroyRenter = await renterUserModel.findOneAndDelete(id);
        if(!destroyRenter){
           return res.status(400).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy renter"});
    }
};

export const updateDeliveryProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = deliveryUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
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
        const {id} = req.body;
        const destroyDelivery = await delivaryUserModel.findOneAndDelete(id);
        if(!destroyDelivery){
           return res.status(400).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy delivery"});
    }
};

// for displaying the users feedback
export const OwnersFeedbacks = async (req,res)=>{
    try{
     const ownersFeedback = await userFeedbackModel.find({});
     if(!ownersFeedback){
      return res.status(404).json({message:"There's no owners feedback up to now !"});
     }
     return res.status(200).json({message:"owners feedback: ",ownersFeedback});
    }catch(error){
      return res.status(500).json({message:"Error during displaying the owners feedbacks",error:error.stack});
    }
};
export const RentersFeedbacks = async (req,res)=>{
    try{
      const rentersFeedback = await userRenterFeedbackModel.find({});
      if(!rentersFeedback){
       return res.status(404).json({message:"There's no renters feedback up to now !"});
      }
      return res.status(200).json({message:"renters feedback: ",rentersFeedback});
    }catch(error){
      return res.status(500).json({message:"Error during displaying the owners feedbacks",error:error.stack});
    }
};
export const allFeedbacks = async (req,res)=>{
  try{
    const ownersFeedback = await userFeedbackModel.find({});
    const rentersFeedback = await userRenterFeedbackModel.find({});
    if(!ownersFeedback && !rentersFeedback){
      return res.status(404).json({message:"No Feedbacks up to now"});
    }
    return res.status(200).json({message:"The Owners and Renters Feedback : ",ownersFeedback,rentersFeedback});
  }catch(error){
    return res.status(500).json({message:"Error during displaying the owners feedbacks",error:error.stack});
  }
};

// get all users complaint

export const getAllUsersComplaint = async (req,res)=>{
   try{
     const allComplaintMessages = await UserComplaintModel.find({});
     if(!allComplaintMessages){
      return res.status(404).json({message:"No Complaint messages Found"});
     }
     return res.status(200).json({message:"Complaint Messages For Your: ",allComplaintMessages});
   }catch(error){
    return res.status(500).json({message:"Error during retrive all complaints",error:error.stack});
   }
};

export const CompalintProcces = async (req,res)=>{
   try{
    // check the rental first

    const {complaintId} = req.body;
    const ProcessComplaint = await UserComplaintModel.findByIdAndUpdate(complaintId,{MsgStatus:"Approved"});
    const renterComplaint = await UserComplaintModel.findOne({complaintId});
    const renterId = renterComplaint.renterId;
    const renter = await renterUserModel.find({renterId});
    const renterEmail  = renter.email;
    try {
      await axios.post('http://localhost:3000/email/sendEmail', {
          to: renterEmail,
          subject: "Replay regrading to your complaint message",
          text: `Dear User,\n\nThank you for your question and we solve the problem as soon as possible. \n\nBest regards,\nRental Platform`,
      });

      return res.status(200).json({ message: "OTP sent successfully", OTPCode });
  } catch (error) {
      return res.status(500).json({ message: "Error during sending the email", error: error.stack });
  }
   }catch(error){
    return res.status(500).json({message:"Error during procees the complaint",error:error.stack});
   }
};

// filters section
export const getAllOWners = async (req,res)=>{
  try{
   const Owners = await ownerUserModel.find({});
   if(!Owners){
    return res.status(404).json({message:"No Owners Found!"});
   }
   return res.status(200).json({message:"Application Owners Users: ",Owners});
  }catch(error){
    return res.status(500).json({message:"Error during get all platform owners !",error:error.stack});
  }
};

export const getAllRenters = async (req,res)=>{
  try{
    const Renters = await renterUserModel.find({});
    if(!Renters){
     return res.status(404).json({message:"No Renters Found!"});
    }
    return res.status(200).json({message:"Application Renters Users: ",Renters});
  }catch(error){
    return res.status(500).json({message:"Error during get all platform renters !",error:error.stack});
  }
};

export const getAllProducts = async (req,res)=>{
  try{
   const Items = await Item.find({});
   if (!Items){
    return res.status(404).json({message:"No Items Found!"});
   }
  }catch(error){
    return res.status(500).json({message:"Error during get all Produect !",error:error.stack});
  }
};

export const getAllRentals = async (req,res)=>{
  try{
   
  }catch(error){
    return res.status(500).json({message:"Error during get all rentals !",error:error.stack});
  }
};

export const getAllDeliverys = async (req,res)=>{
  try{
    const Deliveres = await delivaryUserModel.find({});
    if(!Deliveres){
     return res.status(404).json({message:"No Deliveres Found!"});
    }
    return res.status(200).json({message:"Application Deliveres Users: ",Deliveres});
  }catch(error){
    return res.status(500).json({message:"Error during get all platform deliverys !",error:error.stack});
  }
};

export const getAllCatProducts = async (req,res)=>{
  try{
   const categories = await Item.distinct('category');
   if (!categories){
    return res.status(404).json({message:"No categores Found!"});
   }
   return res.status(200).json({message:"Platfom items categores : ",categories});
  }catch(error){
    return res.status(500).json({message:"Error during get all Cat. Produect !",error:error.stack});
  }
};

export const getAllCatRentals = async (req,res)=>{
  try{

  }catch(error){
    return res.status(500).json({message:"Error during get all Cat. rental !",error:error.stack});
  }
};