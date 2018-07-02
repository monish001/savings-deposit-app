const Joi = require('joi');

module.exports = {
    getReport: {
        query: {
            startDate: Joi.string().length(24).required(),
            endDate: Joi.string().length(24).required(),
        }
    },
    getAllSelf: {
        query: {
            bankName: Joi.string(),
            minAmount: Joi.number().precision(2).positive(),
            maxAmount: Joi.number().precision(2).positive(),
            startDate: Joi.string().length(24),
            endDate: Joi.string().length(24),
        }
    },
    createSelf: {
        body: {
            bankName: Joi.string().required(),
            accountNumber: Joi.number().positive().required(),
            initialAmount: Joi.number().precision(2).positive().required(),
            startDate: Joi.string().length(24).required(),
            endDate: Joi.string().length(24).required(),
            interest: Joi.number().precision(2).positive().required(),
            tax: Joi.number().precision(2).positive().required(),
        }
    },
    getAll: {
        query: {
            bankName: Joi.string(),
            minAmount: Joi.number().precision(2).positive(),
            maxAmount: Joi.number().precision(2).positive(),
            startDate: Joi.string().length(24),
            endDate: Joi.string().length(24),
            userId: Joi.number().integer().positive(),
        }
    },
    create: {
        body: {
            bankName: Joi.string().required(),
            accountNumber: Joi.number().positive().required(),
            initialAmount: Joi.number().precision(2).positive().required(),
            startDate: Joi.string().length(24).required(),
            endDate: Joi.string().length(24).required(),
            interest: Joi.number().precision(2).positive().required(),
            tax: Joi.number().precision(2).positive().required(),
            userId: Joi.number().integer().positive().required(),
        }
    },
    getByIdSelf: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
    updateSelf: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
    removeSelf: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
    getById: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
    update: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
    remove: {
        params: {
            id: Joi.number().positive().required(),
        },
    },
};