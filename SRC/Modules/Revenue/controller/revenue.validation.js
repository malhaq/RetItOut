import Joi from'joi';

export const RevenueSchema = Joi.object({
    categoryName:Joi.string().valid('', '').required(),
});