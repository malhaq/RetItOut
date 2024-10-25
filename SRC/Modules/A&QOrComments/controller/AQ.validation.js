import Joi from'joi';

export const commentSchema = Joi.object({
    comment:Joi.string().min(20).max(200).required(),
});
