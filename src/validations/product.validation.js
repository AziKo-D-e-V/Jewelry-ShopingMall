const joi = require('joi');

const productValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
    })

    const {error} = schema.validate(data);

    return error ? error.message : false;
}
 
module.exports = { productValidation };