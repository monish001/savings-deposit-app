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
            bankName: [Joi.string(), Joi.string().allow('')],
            minAmount: [Joi.number().precision(2).min(0.00), Joi.string().allow('')],
            maxAmount: [Joi.number().precision(2).min(0.00), Joi.string().allow('')],
            startDate: [Joi.string().length(24), Joi.string().allow('')],
            endDate: [Joi.string().length(24), Joi.string().allow('')],
        }
    },
    createSelf: {
        body: {
            bankName: Joi.string().required(),
            accountNumber: Joi.number().positive().required(),
            initialAmount: Joi.number().precision(2).min(0.00).required(),
            startDate: Joi.string().length(24).required(),
            endDate: Joi.string().length(24).required(),
            interest: Joi.number().precision(2).min(0.00).required(),
            tax: Joi.number().precision(2).min(0.00).required(),
        }
    },
    getAll: {
        query: {
            bankName: [Joi.string(), Joi.string().allow('')],
            minAmount: [Joi.number().precision(2).min(0.00), Joi.string().allow('')],
            maxAmount: [Joi.number().precision(2).min(0.00), Joi.string().allow('')],
            startDate: [Joi.string().length(24), Joi.string().allow('')],
            endDate: [Joi.string().length(24), Joi.string().allow('')],
            userId: [Joi.number().integer().positive(), Joi.string().allow('')],
        }
    },
    create: {
        body: {
            bankName: Joi.string().required(),
            accountNumber: Joi.number().positive().required(),
            initialAmount: Joi.number().precision(2).min(0.00).required(),
            startDate: Joi.string().length(24).required(),
            endDate: Joi.string().length(24).required(),
            interest: Joi.number().precision(2).min(0.00).required(),
            tax: Joi.number().precision(2).min(0.00).required(),
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