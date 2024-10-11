import Joi from'joi';


// validate user signup
export const ownerSignUpSchema = Joi.object({
    userName:Joi.string().min(5).max(20).required(),
    age:Joi.number().integer().min(1).max(110),
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    gender:Joi.string().valid('Male', 'Female').required(),
    password:Joi.string().min(5).max(10).required(),
});

export const renterSignUpSchema = Joi.object({
    userName:Joi.string().min(5).max(20).required(),
    age:Joi.number().integer().min(1).max(110),
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    gender:Joi.string().valid('Male', 'Female').required(),
    password:Joi.string().min(5).max(10).required(),
});

export const deliverySignUpSchema = Joi.object({
    userName:Joi.string().min(5).max(20).required(),
    age:Joi.number().integer().min(1).max(110),
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    gender:Joi.string().valid('Male', 'Female').required(),
    password:Joi.string().min(5).max(10).required(),
});

export const adminSignUpSchema = Joi.object({
    userName:Joi.string().min(5).max(20).required(),
    age:Joi.number().integer().min(1).max(110),
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    gender:Joi.string().valid('Male', 'Female').required(),
    password:Joi.string().min(5).max(10).required(),
});

// validate user signin
export const ownerSignInSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(10).required(),
});
export const renterSignInSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(10).required(),
});
export const deliverySignInSchema = Joi.object({
   email:Joi.string().email().required(),
   password:Joi.string().min(5).max(10).required(),
});
export const adminSignInSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(10).required(),
});