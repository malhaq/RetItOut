import { json } from "express";
import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import InsuranceRevenueModel from "../../../../DB/models/InsuranceRevenie.model.js";
import insurancesModel from "../../../../DB/models/Insurances.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import UserComplaintModel from "../../../../DB/models/UserComplaint.model.js";
import Item from "../../Item/controller/itemModel.js";
import UserInsuranceModel from "./../../../../DB/models/UserInsurance.model.js";
import { complaintSchema, InsuSubSchema, InsuUnSubSchema } from "./insurance.validation.js";
import axios from 'axios';

// add insurance
export const InsuranceSubscrption = async (req, res) => {
  try {
    const { InsuranceType , amountOfMoney} = req.body;
    const checkType = InsuSubSchema.validate({InsuranceType,amountOfMoney},{abortEarly:false});
    if(checkType.error){
      return res.status(400).json(checkType.error);
    }
    const ownerId = req.userId;
    // check if this insurance exist or not
    const isActive = await insurancesModel.find({
      insuName: InsuranceType,
      active: true,
    });
    if (!isActive) {
      return res.status(404).json({
        message: "The type of insurance you requested is not available !",
      });
    }
    const checkexistingOwner = await UserInsuranceModel.find({
      OwnerId: ownerId,
    });
    if (!checkexistingOwner) {
      return res.status(409).json({
        message: "You are already subscrible for this insurance !",
      });
    }
  const createInsu = await UserInsuranceModel.create({
    OwnerId: ownerId,
    InsuranceType,
    ProductCovers: isActive.coveredProductsNumber,
    Price:amountOfMoney,
    Subscribted: true,
    });
    await InsuranceRevenueModel.create({ownerId,insurenceType:InsuranceType,amoutOfMoney:amountOfMoney});
    return res.status(200).json({
      message: "You have subscribed successfully",
      createInsu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occur during insurance subscription !",
      error: error.stack,
    });
  }
};

// remove the insurance
export const InsuranceUnSubscrption = async (req, res) => {
  try {
    const { InsuranceType } = req.body;
    const checkType = InsuUnSubSchema.validate({InsuranceType});
    if(checkType.error){
        return res.status(400).json(checkType.error);
    }
    const ownerId = req.userId;
    const checkexistingOwner = await UserInsuranceModel.findOne({
      OwnerId: ownerId,
    });
    if (!checkexistingOwner) {
      return res.status(404).json({
        message: "You are not subscribled for this insurance !",
      });
    }
    const updateSubscription = await UserInsuranceModel.findOneAndUpdate({
      Subscribted: false,
    });
    return res.json({message:"You have successfully unsubscribted",updateSubscription});
  } catch (error) {
    return res.json({message:"There is an error during unsubscribtion insurance !",error:error.stack});
  }
};

// the renter complaint about some item
export const complaint = async (req,res)=>{
   try{
    const {ProductId,Msg} = req.body;
    const checkMsg = complaintSchema.validate({Msg},{abortEarly:false});
    if(checkMsg.error){
        return res.status(400).json(checkMsg.error);
    }
    const renterId = req.userId;
    const createComplaintMsg = await UserComplaintModel.create({renterId:renterId,ProductId:ProductId,Msg:Msg});
    // admin notification
    const admin = await adminUserModel.findOne({});
    const adminEmail = admin.email;
    try {
      await axios.post('http://localhost:3000/email/sendEmail',
          {
              to: adminEmail,
              subject: "Complaint Request",
              text: `Dear Admin,\n\nYou have a new complaint letter in your dashbord\n\nPlease check it as soon as possible\n\nBest regards,\nRental Platform\n\nThe message is: ${Msg} `,
          });
  } catch (error) {
      return res.json({ message: "Error during sending the email", error: error.stack });
  }
  return res.status(200).json({message:"Your Complaint sent successfully",createComplaintMsg});
   }catch(error){
    return res.status(500).json({message:"There is an error during sending the complaint msg", error:error.stack});
   }
};