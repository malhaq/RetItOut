import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import { adminUpdateSchema, insuranceSchema } from "./adminprofile.validation.js";
import { ownerUpdateSchema } from "../../OwnerProfile/controller/ownerprofile.validation.js";
import { renterUpdateSchema } from "../../RenterProfile/controller/renterprofile.validation.js";
import { deliveryUpdateSchema } from "../../DeliveryProfile/controller/deliveryprofile.validation.js";
import userFeedbackModel from "../../../../DB/models/userFeedback.model.js";
import userRenterFeedbackModel from "../../../../DB/models/UseFeedbaclRenter.model.js";
import { json } from "express";
import UserComplaintModel from "../../../../DB/models/UserComplaint.model.js";
import axios from 'axios';
import Item from "../../Item/controller/itemModel.js";
import insurancesModel from "../../../../DB/models/Insurances.model.js";
import UserInsuranceModel from "../../../../DB/models/UserInsurance.model.js";
import InsuranceRevenueModel from "../../../../DB/models/InsuranceRevenie.model.js";


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

// complaint messages process
export const ComplaintProcess = async (req, res) => {
  try {
      const { id } = req.params;
      const ProcessComplaint = await UserComplaintModel.findByIdAndUpdate(
          id,
          { MsgStatus: "Approved" }
      );
      if (!ProcessComplaint) {
          return res.status(404).json({ message: "Not Found the complaint!" });
      }
      // renter notification
      const complaint  = await UserComplaintModel.findOne({_id:id});
      const renterId = complaint.renterId;
      const renter = await renterUserModel.findOne({_id:renterId});
      try {
        await axios.post('http://localhost:3000/email/sendEmail',
            {
                to: renter.email,
                subject: "Complaint Solved",
                text: `Dear Renter,\n\nYout complaint request is solved\n\nWe apologize for the problem\n\nBest regards,\nRental Platform`,
            });
    } catch (error) {
        return res.json({ message: "Error during sending the email", error: error.stack });
    }
      return res.status(200).json({
          message: "Complaint message processed successfully.",
          ProcessComplaint,
      });
  } catch (error) {
      return res.status(500).json({
          message: "Error during processing the complaint",
          error: error.stack,
      });
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


// insurance section

export const addInsurance = async (req,res)=>{
  try{
   const {insuName,price,coveredProductsNumber,coverageDuration,active} = req.body;
   const checkInputData = insuranceSchema.validate({insuName,price,coveredProductsNumber,coverageDuration,active},{abortEarly: false });
   if(checkInputData.error){
    return res.status(400).json(checkInputData.error);
   }
   const insurance = await insurancesModel.create({insuName,price,coveredProductsNumber,coverageDuration});
   if(!insurance){
    return res.status(500).json({messagr:"Error during create new insurance"});
   }
   return res.status(200).json({message:"The insurance created successfully",insurance});
  }catch(error){
    return res.status(500).json({message:"Error during add new insurance",error:error.stack});
  }
};

export const updateInsurance = async (req,res)=>{
  try{
    const { isuranceId } = req.params;
    const {insuName,price,coveredProductsNumber,coverageDuration,active} = req.body;
    const checkInputData = insuranceSchema.validate({insuName,price,coveredProductsNumber,coverageDuration,active},{abortEarly: false });
    if(checkInputData.error){
     return res.status(400).json(checkInputData.error);
    }
    const updatedInsurance =await insurancesModel.findByIdAndUpdate( isuranceId,{insuName,price,coveredProductsNumber,coverageDuration,active});
    if(!updatedInsurance){
      return res.status(404).json({message:"Insurance Not Found!"});
    }
    return res.status(200).json({message:"The insurance data updated successfully : ",updatedInsurance});
  }catch(error){
    return res.status(500).json({message:"Error during update insurance",error:error.stack});
  }
};
export const destroyInsurance = async (req,res)=>{
  try{
    const { isuranceId } = req.params;
    const insurance = await insurancesModel.findByIdAndDelete(isuranceId);
    if(!insurance){
      return res.status(404).json({message:"Insurance Not Found!"});
    }
    return res.status(200).json({message:"Insurance deleted successfully"});
  }catch(error){
    return res.status(500).json({message:"Error during destroy insurance",error:error.stack});
  }
};

export const showAllInsurances = async (req,res)=>{
  try{
   const allInsurancesData = await insurancesModel.find();
   if(!allInsurancesData){
    return res.status(404).json({message:"No Insurances Found!"});
  }
  return res.status(200).json({messsage:"This is all insurances data: ",allInsurancesData});
  }catch(error){
    return res.status(500).json({message:"Error during dispaly all  insurances",error:error.stack});
  }
};


// revenues section
export const getRevenues = async (req, res) => {
  try {
    const totalRevenue = await InsuranceRevenueModel.aggregate([
      {
        $group: {
          _id: null,
          platformRevenue: { $sum: "$amoutOfMoney" },
        },
      },
    ]);
    return res.json({
      message: "Total revenue retrieved successfully",
      platformRevenue: totalRevenue[0]?.platformRevenue || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during displaying the platform revenues",
      error: error.stack,
    });
  }
};