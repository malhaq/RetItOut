import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminSignInSchema, adminSignUpSchema, deliverySignInSchema, deliverySignUpSchema, ownerSignInSchema, ownerSignUpSchema, renterSignInSchema, renterSignUpSchema } from "./auth.validation.js";

// signup section
export const ownerSignUp = async (req,res)=>{
    try{
        const {userName,age,email,address,phoneNumber,gender,password}=req.body;
        const checkValid = ownerSignUpSchema.validate({userName,age,email,address,phoneNumber,gender,password},{abortEarly:false});
        if(checkValid.error){
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password,8);
        const createOwner = await ownerUserModel.create({userName,age,email,address,phoneNumber,gender,password:hashPassword});
        return res.json({message:"Owner Signup Successfully",createOwner});
    }
    catch(error){
        return res.json({message:"There is an error occur during owner signup",error:error.stack});
    }
}

export const renterSignUp = async (req,res)=>{
    try{
        const {userName,age,email,address,phoneNumber,gender,password}=req.body;
        const checkValid = renterSignUpSchema.validate({userName,age,email,address,phoneNumber,gender,password},{abortEarly:false});
        if(checkValid.error){
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password,8);
        const createrenter = await renterUserModel.create({userName,age,email,address,phoneNumber,gender,password:hashPassword});
        return res.json({message:"Renter Signup Successfully",createrenter});
    }
    catch(error){
        return res.json({message:"There is an error occur during renter signup",error:error.stack});
    }
}

export const delivarySignUp = async (req,res)=>{
    try{
        const {userName,age,email,address,phoneNumber,gender,password}=req.body;
        const checkValid = deliverySignUpSchema.validate({userName,age,email,address,phoneNumber,gender,password},{abortEarly:false});
        if(checkValid.error){
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password,8);
        const createDelivary = await delivaryUserModel.create({userName,age,email,address,phoneNumber,gender,password:hashPassword});
        return res.json({message:"Delivary Signup Successfully",createDelivary});
    }
    catch(error){
        return res.json({message:"There is an error occur during delivery signup",error:error.stack});
    }
}

export const adminSignUp = async (req,res)=>{
    try{
        const {userName,age,email,address,phoneNumber,gender,password}=req.body;
        const checkValid = adminSignUpSchema.validate({userName,age,email,address,phoneNumber,gender,password},{abortEarly:false});
        if(checkValid.error){
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password,8);
        const createAdmin = await adminUserModel.create({userName,age,email,address,phoneNumber,gender,password:hashPassword});
        return res.json({message:"Admin Signup Successfully",createAdmin});
    }
    catch(error){
        return res.json({message:"There is an error occur during admin signup",error:error.stack});
    }
}

// signin section
export const ownerSignin = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const checkAuth = ownerSignInSchema.validate({email,password},{abortEarly:false});
        if(checkAuth.error){
            return res.json(checkAuth.error);
        }
        const owner = await ownerUserModel.findOne({email});
        if(!owner){
            return res.json({message:"Invalid email !"});
        }
        const checkPassword = await bcrypt.compare(password,owner.password);
        if(!checkPassword){
            return res.json({message:"Invalid password!"});
        }
        var token = jwt.sign({ id:owner._id }, 'LGOINTOKENJABER99');
        return res.json({message:"Hi, Login Successfully",token});
    }
    catch(error){
        console.error(error);
        return res.json({message:"There is an error occur during owner signin",error:error.stack});
    }
};

export const renterSignin = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const checkAuth = renterSignInSchema.validate({email,password},{abortEarly:false});
        if(checkAuth.error){
            return res.json(checkAuth.error);
        }
        const renter = await renterUserModel.findOne({email});
        if(!renter){
            return res.json({message:"Invalid email !"});
        }
        const checkPassword =await bcrypt.compare(password,renter.password);
        if(!checkPassword){
            return res.json({message:"Invalid Password"});
        }
        var token = jwt.sign({ id:renter._id }, 'LGOINTOKENJABER100');
        return res.json({message:"Hi, Login Successfully",token});
    }
    catch(error){
        console.error(error);
        return res.json({message:"There is an error occur during renter signin",error:error.stack});
    }
}

export const delivarySignin = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const checkAuth = deliverySignInSchema.validate({email,password},{abortEarly:false});
        if(checkAuth.error){
            return res.json(checkAuth.error);
        }
        const delivery = await delivaryUserModel.findOne({email});
        if(!delivery){
            return res.json({message:"Invalid email !"});
        }
        const checkPassword = await bcrypt.compare(password,delivery.password);
        if(!checkPassword){
            return res.json({message:"Invalid password !"});
        }
        var token = jwt.sign({ id:delivery._id }, 'LGOINTOKENJABER101');
        return res.json({message:"Hi, Login Successfully",token});
    }
    catch(error){
        console.error(error);
        return res.json({message:"There is an error occur during delivery signin",error:error.stack});
    }
}

export const adminSignin = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const checkAuth = adminSignInSchema.validate({email,password},{abortEarly:false});
        if(checkAuth.error){
            return res.json(checkAuth.error);
        }
        const admin = await adminUserModel.findOne({email});
        if(!admin){
            return res.json({message:"Invalid email !"});
        }
        const checkPassword =  await bcrypt.compare(password,admin.password);
        if(!checkPassword){
            return res.json({message:"Invalid Password !"});
        }
        var token = jwt.sign({ id:admin._id }, 'LGOINTOKENJABER99');
        return res.json({message:"Hi, Login Successfully",token});
    }
    catch(error){
        console.error(error);
        return res.json({message:"There is an error occur during admin signin",error:error.stack});
    }
}