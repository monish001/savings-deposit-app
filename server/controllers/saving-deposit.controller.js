const savingDepositModel = require("../models/saving-deposit.model");

async function getAll(req, res, next) {
    const sds = await savingDepositModel.getAll();
    return res.json(sds);
}

async function getById(req, res, next) {
    const id = req.params.id;
    const sd = await savingDepositModel.getById(id);
    return res.json(sd);
}

async function create(req, res, next) {
    const args = req.body;
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
    return res.json(sd);
}

async function remove(req, res, next) {
    const id = req.params.id;
    const sd = await savingDepositModel.remove(id);
    return res.json(sd);
}

async function update(req, res, next) {
    const id = req.params.id;
    const args = req.body;
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
    const sd = await savingDepositModel
        .update(id, {
            userId,
            bankName,
            accountNumber,
            initialAmount,
            startDate,
            endDate,
            interest,
            tax
        });
    return res.json(sd);
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update
};