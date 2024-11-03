import Joi from'joi';

export const InsuSubSchema = Joi.object({
    InsuranceType:Joi.string().valid('Basic','Normal','Supper').required(),
    amountOfMoney:Joi.number().required()
});

export const InsuUnSubSchema = Joi.object({
    InsuranceType:Joi.string().valid('Basic','Normal','Supper').required(),
});

export const complaintSchema = Joi.object({
    Msg:Joi.string().min(30).max(300).required(),
});