import Joi from'joi';

export const adminUpdateSchema = Joi.object({
    email:Joi.string().email().required(),
    address:Joi.string().min(10).max(30).required(),
    phoneNumber:Joi.number().integer().min(10).max(9999999999).required(),
    password:Joi.string().min(5).max(10).required(),
});

export const insuranceSchema = Joi.object({
    insuName:Joi.string().min(4).max(30).required(),
    price:Joi.number().required(),
    coveredProductsNumber:Joi.number().required(),
    coverageDuration:Joi.number().required(),
    active:Joi.boolean().required()
});