import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import adminUserModel from "../../../../DB/models/AdminUser.model.js";

// signup section
export const ownerSignUp = async (req,res)=>{
    const {userName,age,email,address,phoneNumber,gender,password}=req.body;
    const createOwner = await ownerUserModel.create({userName,age,email,address,phoneNumber,gender,password});
    return res.json({message:"Owner Signup Successfully",createOwner});
}

export const renterSignUp = async (req,res)=>{
    const {userName,age,email,address,phoneNumber,gender,password}=req.body;
    const createrenter = await renterUserModel.create({userName,age,email,address,phoneNumber,gender,password});
    return res.json({message:"Renter Signup Successfully",createrenter});
}

export const delivarySignUp = async (req,res)=>{
    const {userName,age,email,address,phoneNumber,gender,password}=req.body;
    const createDelivary = await delivaryUserModel.create({userName,age,email,address,phoneNumber,gender,password});
    return res.json({message:"Delivary Signup Successfully",createDelivary});
}

export const adminSignUp = async (req,res)=>{
    const {userName,age,email,address,phoneNumber,gender,password}=req.body;
    const createAdmin = await adminUserModel.create({userName,age,email,address,phoneNumber,gender,password});
    return res.json({message:"Admin Signup Successfully",createAdmin});
}

// signin section
export const ownerSignin = async (req,res)=>{
    const {email,password}=req.body;
    const owner = await ownerUserModel.findOne({email,password});
    if(owner){
        return res.json({message:"Hi, Login Successfully",owner});
    }
    else{
        return res.json({message:"Invalid data!"});
    }
}

export const renterSignin = async (req,res)=>{
    const {email,password}=req.body;
    const renter = await renterUserModel.findOne({email,password});
    if(renter){
        return res.json({message:"Hi, Login Successfully",renter});
    }
    else{
        return res.json({message:"Invalid data!"});
    }
}

export const delivarySignin = async (req,res)=>{
    const {email,password}=req.body;
    const delivery = await delivaryUserModel.findOne({email,password});
    if(delivery){
        return res.json({message:"Hi, Login Successfully",delivery});
    }
    else{
        return res.json({message:"Invalid data!"});
    }
}

export const adminSignin = async (req,res)=>{
    const {email,password}=req.body;
    const admin = await adminUserModel.findOne({email,password});
    if(admin){
        return res.json({message:"Hi, Login Successfully",admin});
    }
    else{
        return res.json({message:"Invalid data!"});
    }
}