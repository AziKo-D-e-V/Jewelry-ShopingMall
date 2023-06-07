const joi = require('joi');

const commentValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        text: joi.string().required(),
    })

    const {error} = schema.validate(data);

    return error ? error.message : false;
}
 
module.exports = { commentValidation };