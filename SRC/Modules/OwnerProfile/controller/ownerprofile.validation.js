import Joi from'joi';

export const ownerUpdateSchema = Joi.object({
    email:Joi.string().email(),
    address:Joi.string().min(10).max(30),
    phoneNumber:Joi.number().integer().min(10).max(9999999999),
    password:Joi.string().min(5).max(10),
});
