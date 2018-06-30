const savingDepositSchema = require("./db/saving-deposit.schema");
const debug = require('debug')('sd:models:saving-deposit.model');

async function getAll(where) {
    const {
        userId,
        bankName,
        minAmount,
        maxAmount,
        startDate,
        endDate
    } = where;
    const sds = await savingDepositSchema.findAll({
        where: {
            userId,
            bankName,
            minAmount,
            maxAmount,
            startDate,
            endDate
        }
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
    if(sd.length === 1) {
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