var createError = require('http-errors');
const savingDepositModel = require("../models/saving-deposit.model");
const debug = require('debug')('sd:controllers:saving-deposit.controller');

async function getAll(req, res, next, userId) {
    debug('getAll', req.query);
    const {
        bankName,
        minAmount,
        maxAmount,
        startDate,
        endDate
    } = req.query;
    const sds = await savingDepositModel.getAll({
        userId,
        bankName,
        minAmount,
        maxAmount,
        startDate,
        endDate
    });
    return res.json({
        ok: true,
        savingDeposits: sds,
        message: 'Saving deposits successfully retrieved.'
    });
}

async function getById(req, res, next, userId) {
    const _id = req.params.id;
    const sd = await savingDepositModel.getById({
        _id,
        userId
    });
    if (sd) {
        return res.json({
            ok: true,
            savingDeposit: sd,
            message: 'Saving deposit successfully retrieved.'
        });
    } else {
        return next(new createError.NotFound());
    }
}

async function create(req, res, next, userId) {
    const args = req.body;
    const {
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    } = args;
    const sd = await savingDepositModel.create({
        userId,
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    });
    return res.json({
        ok: true,
        savingDeposit: sd,
        message: 'Saving deposit successfully created.'
    });
}

async function remove(req, res, next, userId) {
    const _id = req.params.id;
    const sd = await savingDepositModel.remove({
        _id,
        userId
    });
    return res.json({
        ok: true,
        message: 'The saving deposit is successfully deleted.'
    });
}

async function update(req, res, next, userId) {
    const _id = req.params.id;
    const args = req.body;
    const {
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    } = args;
    const affectedCount = await savingDepositModel
        .update(_id, {
            userId,
            bankName,
            accountNumber,
            initialAmount,
            startDate,
            endDate,
            interest,
            tax
        });
    if (affectedCount) {
        const sd = await savingDepositModel.getById({
            _id
        });
        return res.json({
            ok: true,
            message: 'The saving deposit is successfully updated.',
            savingDeposit: sd
        });
    } else {
        return next(new createError.NotFound());
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update
};