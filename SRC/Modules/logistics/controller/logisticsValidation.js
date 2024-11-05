import Joi from 'joi';

function idSchema(obj) {
    const Schema = Joi.object(obj)({
        id: Joi.string().length(24).hex().required(),
    });
    return Schema.validate(obj);
}

function locationSchema(obj) {
    const Schema = Joi.object({
        lat: Joi.number().min(-90).max(90).required(),
        lng: Joi.number().min(-180).max(180).required(),
        searchQuery: Joi.string().trim().optional()
    });
    return Schema.validate(obj);
}

export {
    idSchema,
    locationSchema,
};
export default {
    idSchema,
    locationSchema,
};
