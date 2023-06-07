const joi = require('joi');

const authValidation = (data) => {
    const schema = joi.object({
        username: joi.string().alphanum().required(),
        password: joi.string().min(5).max(8).required(),
    })

    const {error} = schema.validate(data);

    return error ? error.message : false;
}
 
module.exports = { authValidation };