const Joi = require('joi');
const PASSWORD_REGEX = /[a-zA-Z0-9]{3,30}/
;
module.exports = {
    register: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(PASSWORD_REGEX).required(),
            cpassword: Joi.string().regex(PASSWORD_REGEX).required(),
        }
    },
    emailVerification: {
        params: {
            guid: Joi.string().length(72).required(),
        }
    },
    google: {},
    facebook: {},
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(PASSWORD_REGEX).required(),
        }
    },
    logout: {}
};