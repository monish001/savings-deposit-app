var createError = require('http-errors');
const savingDepositModel = require("../models/saving-deposit.model");
const debug = require('debug')('sd:controllers:saving-deposit.controller');
const NUMBER_DAYS_IN_YEAR = 360.00;

function getNumberOfDays(startDate, endDate) {
    const numberMsInDay = 1000 * 60 * 60 * 24;
    const startDayNumber = Math.floor(
        new Date(startDate).getTime() / numberMsInDay
    );
    const endDayNumber = Math.floor(
        new Date(endDate).getTime() / numberMsInDay
    );
    return endDayNumber - startDayNumber + 1;
}

// function getSimpleAmount(p, r, t) {
//     // p initial amount,
//     // r interest per yr
//     // t time in years
//     return p * (1.0 + r * t / 100.0)
// }

function getCompoundAmount(p, r, t, N = NUMBER_DAYS_IN_YEAR) {
    // p initial amount,
    // r interest per yr
    // t time in years
    // N number of times that interest is compounded per year
    // See https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php for more details
    return p * Math.pow(1.0 + r / (N * 100.0), N * t)
}

function maxOfIsoDate(date1, date2) {
    if (new Date(date1).getTime() >= new Date(date2).getTime()) {
        return date1;
    }
    return date2;
}

function minOfIsoDate(date1, date2) {
    if (new Date(date1).getTime() <= new Date(date2).getTime()) {
        return date1;
    }
    return date2;
}

function isGteIsoDate(date1, date2) {
    if (new Date(date1).getTime() >= new Date(date2).getTime()) {
        return true;
    }
    return false;
}
async function getReport(req, res, next) {
    debug('getReport', req.query, req.user);
    const {
        startDate,
        endDate
    } = req.query;
    const userId = req.user._id;
    const sds = await savingDepositModel.getAll({
        userId,
        minStartDate: startDate,
        maxEndDate: endDate
    });
    let totalGains = 0,
        totalLoss = 0,
        totalTax = 0;
    const rows = sds.map(sd => {
        debug('getReport', 'sd._id', sd._id);
        debug('getReport', 'sd.startDate', sd.startDate);
        debug('getReport', 'sd.endDate', sd.endDate);
        debug('getReport', 'initialAmount', sd.initialAmount);
        debug('getReport', 'interest', sd.interest);
        const reportStartDate = maxOfIsoDate(startDate, sd.startDate);
        const reportEndDate = minOfIsoDate(endDate, sd.endDate);
        debug('getReport', 'reportStartDate', reportStartDate);
        debug('getReport', 'reportEndDate', reportEndDate);
        let amountAtReportStartDate = sd.initialAmount;
        if (isGteIsoDate(reportStartDate, sd.startDate)) {
            amountAtReportStartDate = getCompoundAmount(sd.initialAmount, sd.interest, (getNumberOfDays(reportStartDate, sd.startDate) - 1 /*exclude manually sd.startDate*/ ) / NUMBER_DAYS_IN_YEAR);
        }
        debug('getReport', 'amountAtReportStartDate', amountAtReportStartDate);
        const numberOfDays = getNumberOfDays(reportStartDate, reportEndDate);
        debug('getReport', 'numberOfDays', numberOfDays);
        const totalAmountInUsd = getCompoundAmount(
            amountAtReportStartDate,
            sd.interest,
            numberOfDays / NUMBER_DAYS_IN_YEAR
        );
        debug('getReport', 'totalAmountInUsd', totalAmountInUsd);
        const gainsInUsd = totalAmountInUsd - amountAtReportStartDate;
        const taxInUsd = gainsInUsd > 0 ? sd.tax * gainsInUsd / 100.00 : 0;
        debug('getReport', 'gainsInUsd', gainsInUsd);
        debug('getReport', 'taxInUsd', taxInUsd);
        totalGains += (gainsInUsd > 0 ? gainsInUsd : 0);
        totalLoss += (gainsInUsd < 0 ? (-1 * gainsInUsd) : 0);
        totalTax += taxInUsd;
        return Object.assign({
            gainsInUsd: Number(gainsInUsd).toFixed(2),
            taxInUsd: Number(taxInUsd).toFixed(2),
        }, sd);
    })
    return res.json({
        ok: true,
        savingDepositsReport: {
            rows,
            summary: {
                totalGains: Number(totalGains).toFixed(2),
                totalLoss: Number(totalLoss).toFixed(2),
                totalTax: Number(totalTax).toFixed(2),
            },
            request: {
                startDate,
                endDate
            }
        },
        message: 'Saving deposits report is ready.'
    });
}

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
    const affectedCount = await savingDepositModel.remove({
        _id,
        userId
    });
    if (affectedCount) {
        return res.json({
            ok: true,
            message: 'The saving deposit is successfully deleted.'
        });
    } else {
        return next(new createError.NotFound());
    }
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
    getReport,
    getAll,
    getById,
    create,
    remove,
    update
};