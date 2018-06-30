const savingDepositSchema = require("./db/saving-deposit.schema");

async function getAll() {
    const sds = await savingDepositSchema.findAll().map(el => el.get({
        plain: true
    }));
    console.log(sds);
    return sds;
}

async function getById(id) {
    const sd = await savingDepositSchema.findById(id);
    return sd.get({
        plain: true
    });
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

async function remove(_id) {
    const sd = await savingDepositSchema.destroy({where: {_id}});
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
            _id
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