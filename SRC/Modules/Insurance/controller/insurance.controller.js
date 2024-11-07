import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import InsuranceRevenueModel from "../../../../DB/models/InsuranceRevenie.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import UserComplaintModel from "../../../../DB/models/UserComplaint.model.js";
import Item from "../../Item/controller/itemModel.js";
import UserInsuranceModel from "./../../../../DB/models/UserInsurance.model.js";
import { complaintSchema, InsuSubSchema } from "./insurance.validation.js";
import axios from 'axios';

// add insurance
export const InsuranceSubscrption = async (req, res) => {
  try {
    const { InsuranceType , amountOfMoney} = req.body;
    const checkType = InsuSubSchema.validate({InsuranceType},{abortEarly:false});
    if(checkType.error){
      return res.status(400).json(checkType.error);
    }
    const ownerId = req.userId;
    // check if this insurance exist or not
    const active = await UserInsuranceModel.findOne({
      InsuranceType: InsuranceType,
      InsuranceValidation: true,
    });
    if (!active) {
      return res.json({
        message: "The type of insurance you requested is not available !",
      });
    }
    const checkexistingOwner = await UserInsuranceModel.findOne({
      OwnerId: ownerId,
    });
    if (checkexistingOwner) {
      return res.json({
        message: "You are already subscrible for this insurance !",
      });
    }
    let productCovers = 0;
    let insuCost = 0; // in $ amount of money
    let insuProducts = [];
    if (InsuranceType === "Basic") {
      productCovers = 10;
      insuCost = 15;
      insuProducts = await Item.find({}).limit(10);
    } else if (InsuranceType === "Supper") {
      productCovers = Infinity;
      insuCost = 50;
      insuProducts = await Item.find({});
    }
    const createInsu = await UserInsuranceModel.create({
      OwnerId: ownerId,
      InsuranceType,
      ProductCovers: productCovers,
      InsuranceStartDate: new Date(),
      InsuranceExpireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Subscribted: true,
    });
    const money = await InsuranceRevenueModel.create({ownerId,InsuranceType,amountOfMoney});
    return res.json({
      message: "You have subscribed successfully",
      createInsu,
    });
  } catch (error) {
    return res.json({
      message: "There is an error occur during insurance subscription !",
      error: error.stack,
    });
  }
};

// remove the insurance
export const InsuranceUnSubscrption = async (req, res) => {
  try {
    const { InsuranceType } = req.body;
    const checkType = InsuSubSchema.validate({InsuranceType},{abortEarly:false});
    if(checkType.error){
        return res.json(checkType.error);
    }
    const ownerId = req.userId;
    const active = await UserInsuranceModel.findOne({
      InsuranceType: InsuranceType,
      InsuranceValidation: true,
    });
    if (!active) {
      return res.json({
        message: "The type of insurance you requested is not available !",
      });
    }
    const checkexistingOwner = await UserInsuranceModel.findOne({
      OwnerId: ownerId,
    });
    if (!checkexistingOwner) {
      return res.json({
        message: "You are not subscribled for this insurance !",
      });
    }
    const updateSubscription = await UserInsuranceModel.findByIdAndUpdate({
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
        return res.json(checkMsg.error);
    }
    const renterId = req.userId;
    const renterName = await renterUserModel.find({userName});
    const createComplaintMsg = await UserComplaintModel.create({renterId:renterId,ProductId:ProductId,Msg:Msg});
    try{
      const adminEmail = await adminUserModel.find({email});
      try {
        await axios.post('http://localhost:3000/email/sendEmail', {
            to: adminEmail,
            subject: "New user complaint",
            text: `Dear Admin,\n\nYou Have new complaint message from ${renterName}.\n\nThe Message is ${createComplaintMsg}\n\nPlease check your application dashboard. \n\nBest regards,\nRental Platform`
        });

        return res.status(200).json({ message: "OTP sent successfully", OTPCode });
    } catch (error) {
        return res.status(500).json({ message: "Error during sending the email", error: error.stack });
    }
    }catch(error){
      return res.status(500).json({message:"Error during get the admin main",error:error.stack});
    }
    return res.status(200).json({message:"Your Complaint sent successfully"});
   }catch(error){
    return res.status(500).json({message:"There is an error during sending the complaint msg", error:error.stack});
   }
};