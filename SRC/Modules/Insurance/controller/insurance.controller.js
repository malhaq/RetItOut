import UserComplaintModel from "../../../../DB/models/UserComplaint.model.js";
import UserInsuranceModel from "./../../../../DB/models/UserInsurance.model.js";
import { complaintSchema, InsuSubSchema } from "./insurance.validation.js";

export const InsuranceSubscrption = async (req, res) => {
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
    if (checkexistingOwner) {
      return res.json({
        message: "You are already subscrible for this insurance !",
      });
    }
    let productCovers = 0;
    let insuCost = 0;
    let insuProducts = [];
    if (InsuranceType === "Basic") {
      productCovers = 10;
      insuCost = 15;
      // here I must go  to the products database and store just first 10 products
    } else if (InsuranceType === "Supper") {
      productCovers = Infinity;
      insuCost = 50;
      // here  I  muat store all  owner products
    }
    const createInsu = await UserInsuranceModel.create({
      OwnerId: ownerId,
      InsuranceType,
      ProductCovers: productCovers,
      InsuranceStartDate: new Date(),
      InsuranceExpireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Subscribted: true,
    });
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

export const complaint = async (req,res)=>{
   try{
    const {ProductId,Msg} = req.body;
    const checkMsg = complaintSchema.validate({Msg},{abortEarly:false});
    if(checkMsg.error){
        return res.json(checkMsg.error);
    }
    const renterId = req.userId;
    // here I must check the rental for this renter

    const createComplaintMsg = await UserComplaintModel.create({renterId:renterId,ProductId:ProductId,Msg:Msg});
    return res.json({message:"Your Complaint sent successfully"});
   }catch(error){
    return res.json({message:"There is an error during sending the complaint msg", error:error.stack});
   }
};