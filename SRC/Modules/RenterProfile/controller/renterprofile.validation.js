import Joi from'joi';

export const renterUpdateSchema = Joi.object({
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    password:Joi.string().min(5).max(10).required(),
});

export const itemNameSchema = Joi.object({
    itemName:Joi.string().min(2).max(20).required()
});
