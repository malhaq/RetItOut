import Joi from'joi';

export const emailNotifySchema = Joi.object({
    to:Joi.string().email().required(),
    subject:Joi.string().min(10).max(40),
    text:Joi.string().min(20).max(400),
});
