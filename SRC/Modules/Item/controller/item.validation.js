import Joi from 'joi';

// Joi validation schema for Item creation and update
function itemValidateSchema(obj) {
    const itemSchema = Joi.object({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        description: Joi.string().required(),
        availability: Joi.boolean().default(true),
        logistics: Joi.object({
            deliveryOption: Joi.string().valid('pickup', 'delivery').default('pickup'),
            pickupLocation: Joi.object({
                name: Joi.string().optional(),
                address: Joi.string().optional(),
                coordinates: Joi.object({
                    lat: Joi.number().optional(),
                    lng: Joi.number().optional(),
                }).optional(),
            }).optional(), 
        }).optional(),
        rentalPrice: Joi.object({
            daily: Joi.number().positive().required(),
            weekly: Joi.number().positive().required(),
            monthly: Joi.number().positive().required(),
        }).required(),
        rentalDuration: Joi.object({
            startDate: Joi.date().optional(),
            endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
        }).optional(),
    });
    return itemSchema.validate(obj);
}


// Joi validation schema for Order creation
function orderValidateSchema(obj){
const orderSchema = Joi.object({
    itemId: Joi.string().required(),
    renterId: Joi.string().required(),
    ownerId: Joi.string().required(),
    deliveredby: Joi.string().allow(null).optional(),
    rentalPeriod: Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    }).required(),
    logistics: Joi.object({
        deliveryOption: Joi.string().valid('pickup', 'delivery').required(),
        deliveryAddress: Joi.string().allow(null).optional(),
        pickupLocation: Joi.object({
            name: Joi.string().optional(),
            address: Joi.string().optional(),
            coordinates: Joi.object({
                lat: Joi.number().optional(),
                lng: Joi.number().optional(),
            }).optional(),
        }).optional(),  
    }).optional(),
    status: Joi.string().valid('booked', 'active', 'completed', 'canceled').default('booked'),
    ratings: Joi.object({
        rating: Joi.number().min(0).max(5).optional(),
        comment: Joi.string().optional(),
    }).optional(),
});
return orderSchema.validate(obj);
}


// Joi validation schema for Item creation and update
function UpdateItemValidateSchema(obj) {
    const itemSchema = Joi.object({
        name: Joi.string(),
        owner: Joi.string(),
        description: Joi.string(),
        availability: Joi.boolean(),
        logistics: Joi.object({
            deliveryOption: Joi.string().valid('pickup', 'delivery'),
            pickupLocation: Joi.object({
                name: Joi.string().optional(),
                address: Joi.string().optional(),
                coordinates: Joi.object({
                    lat: Joi.number().optional(),
                    lng: Joi.number().optional(),
                }).optional(),
            }).optional(), 
        }).optional(),
        rentalPrice: Joi.object({
            daily: Joi.number().positive(),
            weekly: Joi.number().positive(),
            monthly: Joi.number().positive(),
        }).required(),
        rentalDuration: Joi.object({
            startDate: Joi.date().optional(),
            endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
        }).optional(),
    });
    return itemSchema.validate(obj);
}

// Export the schemas
export {
    itemValidateSchema,
    orderValidateSchema,
    UpdateItemValidateSchema
};
export default {
    itemValidateSchema,
    orderValidateSchema,
    UpdateItemValidateSchema
}