import Joi from 'joi';


//Validate otp
function verifyOTPSchema(obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(4).pattern(/^[0-9]+$/).required(),

    });

    return schema.validate(obj);
}

//Validate otp resend
function verifyResendSchema(obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        userType: Joi.string().valid('delivary', 'owner', 'renter').required(),

    });

    return schema.validate(obj);
}
export { verifyOTPSchema, verifyResendSchema};
export default{
    verifyOTPSchema,
    verifyResendSchema
}