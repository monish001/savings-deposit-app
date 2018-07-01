const savingDepositSchema = require("./db/saving-deposit.schema");
const debug = require('debug')('sd:models:saving-deposit.model');

function removeUndefinedKeys(args) {
    debug('removeUndefinedKeys', args);
    const result = JSON.parse(JSON.stringify(args));
    debug('removeUndefinedKeys', result);
    return result;
}

async function getAll(where) {
    const {
        userId,
    } = where;
    let bankName;
    if (where.bankName) {
        bankName = where.bankName;
    }
    let initialAmount;
    if (where.minAmount === '0' || where.minAmount) {
        initialAmount = initialAmount || {};
        initialAmount.$gte = Number(where.minAmount);
    }
    if (where.maxAmount === '0' || where.maxAmount) {
        initialAmount = initialAmount || {};
        initialAmount.$lte = Number(where.maxAmount);
    }
    let startDate;
    if (where.startDate && where.startDate !== '') {
        startDate = where.startDate
    }
    let endDate;
    if (where.endDate && where.endDate !== '') {
        endDate = where.endDate
    }
    const sds = await savingDepositSchema.findAll({
        where: removeUndefinedKeys({
            userId,
            bankName,
            initialAmount,
            startDate,
            endDate
        })
    }).map(el => el.get({
        plain: true
    }));
    return sds;
}

async function getById(where) {
    const {
        _id,
        userId
    } = where;
    const sd = await savingDepositSchema.findAll({
        where: {
            _id,
            userId
        }
    }).map(el => el.get({
        plain: true
    }));
    debug('getById', sd);
    if (sd.length === 1) {
        return sd[0];
    }
}

async function create(args) {
    const {
        userId,
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    } = args;
    const sd = await savingDepositSchema.create({
        userId,
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    });
    return sd.get({
        plain: true
    });
}

async function remove(where) {
    const {
        _id,
        userId
    } = where;
    const sd = await savingDepositSchema.destroy({
        where: {
            _id,
            userId
        }
    });
    return sd;
}

async function update(_id, args) {
    const {
        userId,
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    } = args;
    const sd = await savingDepositSchema.update({
        userId,
        bankName,
        accountNumber,
        initialAmount,
        startDate,
        endDate,
        interest,
        tax
    }, {
        where: {
            _id,
            userId
        }
    });
    return sd;
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update
};