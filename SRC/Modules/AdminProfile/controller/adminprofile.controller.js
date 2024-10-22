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


export const updateAdminProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = adminUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
      const id = req.userId;
      const admin = await adminUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!admin){
        return res.json({message:"user not found !"});
      }
      return res.json({message:"your profile updated successfully",admin});
    }catch(error){
        return res.json({message:"Error during update the admin profile !",error:error.stack});
    }
};

export const destroyAdmin = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyAdmin = await adminUserModel.findOneAndDelete(id);
        if(!destroyAdmin){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy admin"});
    }
};

// for another application users control
export const updateOwnerProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = ownerUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
      const owner = await ownerUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!owner){
        return res.json({message:"user not found !"});
      }
      return res.json({message:"your profile updated successfully",owner});
    }catch(error){
        return res.json({message:"Error during update the owner profile !",error:error.stack});
    }
};

export const destroyOwner = async (req,res)=>{
    try{
        const {id} = req.body;
        const destroyOwner = await ownerUserModel.findOneAndDelete(id);
        if(!destroyOwner){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy owner"});
    }
};

export const updateRenterProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = renterUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
      const renter = await renterUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!renter){
        return res.json({message:"user not found !"});
      }
      return res.json({message:"your profile updated successfully",renter});
    }catch(error){
        return res.json({message:"Error during update the renter profile !",error:error.stack});
    }
};

export const destroyRenter = async (req,res)=>{
    try{
        const {id} = req.body;
        const destroyRenter = await renterUserModel.findOneAndDelete(id);
        if(!destroyRenter){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy renter"});
    }
};

export const updateDeliveryProfile = async (req,res)=>{
    try{
      const {id,email,address,phoneNumber,password} = req.body;
      const checkInputData = deliveryUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.json(checkInputData.error);
      }
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
        const {id} = req.body;
        const destroyDelivery = await delivaryUserModel.findOneAndDelete(id);
        if(!destroyDelivery){
           return res.json({message:"user nor found"});
        }
        return res.json({message:"your account deleted successfully"});
    }catch(error){
       return res.json({message:"Error durong destroy delivery"});
    }
};

// for displaying the users feedback
export const OwnersFeedbacks = async (req,res)=>{
    try{
     const ownersFeedback = await userFeedbackModel.find({});
     if(!ownersFeedback){
      return res.json({message:"There's no owners feedback up to now !"});
     }
     return res.json({message:"owners feedback: ",ownersFeedback});
    }catch(error){
      return res.json({message:"Error during displaying the owners feedbacks",error:error.stack});
    }
};
export const RentersFeedbacks = async (req,res)=>{
    try{
      const rentersFeedback = await userRenterFeedbackModel.find({});
      if(!rentersFeedback){
       return res.json({message:"There's no renters feedback up to now !"});
      }
      return res.json({message:"renters feedback: ",rentersFeedback});
    }catch(error){
      return res.json({message:"Error during displaying the owners feedbacks",error:error.stack});
    }
};
export const allFeedbacks = async (req,res)=>{
  try{
    const [ownersFeedback, rentersFeedback] = await Promise.all([
      userFeedbackModel.find({}),
      userRenterFeedbackModel.find({})
    ]);
    if (!ownersFeedback.length && !rentersFeedback.length) {
      return res.json({ message: "No feedback available for both owners and renters!" });
    }
  }catch(error){
    return res.json({message:"Error during displaying the owners feedbacks",error:error.stack});
  }
};

// filters section
export const getAllOWners = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all platform owners !",error:error.stack});
  }
};

export const getAllRenters = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all platform renters !",error:error.stack});
  }
};

export const getAllProducts = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all Produect !",error:error.stack});
  }
};

export const getAllRentals = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all rentals !",error:error.stack});
  }
};

export const getAllDeliverys = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all platform deliverys !",error:error.stack});
  }
};

export const getAllCatProducts = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all Cat. Produect !",error:error.stack});
  }
};

export const getAllCatRentals = async (req,res)=>{
  try{

  }catch(error){
    return res.json({message:"Error during get all Cat. rental !",error:error.stack});
  }
};