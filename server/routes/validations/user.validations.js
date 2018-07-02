const Joi = require('joi');
const PASSWORD_REGEX = /[a-zA-Z0-9]{3,30}/;

module.exports = {
    updatePasswordSelf: {
        body: {
            "oldPassword": Joi.string().regex(PASSWORD_REGEX).required(),
            "newPassword": Joi.string().regex(PASSWORD_REGEX).required(),
            "confirmNewPassword": Joi.string().regex(PASSWORD_REGEX).required(),
        }
    },
    updateSelf: {
        body: {
            photo: Joi.string().required(),
        }
    },
    resetPassword: {
        params: {
            userId: Joi.number().positive().required(),
        }
    },
    resetRetryCount: {
        params: {
            userId: Joi.number().positive().required(),
        }
    },
    update: {
        body: {
            photo: Joi.string().required(),
        },
        params: {
            userId: Joi.number().positive().required(),
        },
    },
    create: {
        body: {
            email: Joi.string().email().required(),
        }
    },
    invite: {
        body: {
            email: Joi.string().email().required(),
        }
    },
    updateRole: {
        params: {
            userId: Joi.number().positive().required(),
            role: Joi.string().valid(['regular_user', 'user_manager', 'admin', 'REGULAR_USER', 'USER_MANAGER', 'ADMIN']).required(),
        },
    },
    remove: {
        params: {
            userId: Joi.number().positive().required(),
            role: Joi.string().valid(['regular_user', 'user_manager', 'admin', 'REGULAR_USER', 'USER_MANAGER', 'ADMIN']).required(),
        }
    },
    getAll: {},
};