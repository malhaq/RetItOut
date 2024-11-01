import Joi from 'joi';


function deliveryRatingSchema(obj) {
    const schema = Joi.object({
        orderid: Joi.string().length(24).hex().required(),
        rating: Joi.number().min(0).max(5).multiple(0.5).required(),
        comment: Joi.string().trim().min(5),
    });

    return schema.validate(obj);
}

function orderRatingSchema(obj) {
    const schema = Joi.object({
        orderid: Joi.string().length(24).hex().required(),
        rating: Joi.number().min(0).max(5).multiple(0.5).required(),
        comment: Joi.string().trim().min(5),
    });
}


export {deliveryRatingSchema,orderRatingSchema} 
export default{
    deliveryRatingSchema,
    orderRatingSchema,
};