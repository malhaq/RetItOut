import Joi from'joi';

export const InsuSubSchema = Joi.object({
    InsuranceType:Joi.string().valid('Basic', 'Supper').required(),
});

export const complaintSchema = Joi.object({
    Msg:Joi.string().min(30).max(300).required(),
});