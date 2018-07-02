var express = require('express');
var savingDepositController = require('../controllers/saving-deposit.controller');
const router = express.Router();
const debug = require('debug')('sd:routes:saving-deposit.routes');
const authentication = require('../authentication');
const validations = require('./validations/saving-deposit.validations'); // @todo
const validate = require('express-validation');

router.route('/users/self/saving-deposits/report')
    .all(authentication.authenticate)
    .get(validate(validations.getReport), (req, res, next) => {
        savingDepositController.getReport(req, res, next);
    });

router.route('/users/self/saving-deposits')
    .all(authentication.authenticate)
    .get(validate(validations.getAllSelf), (req, res, next) => {
        savingDepositController.getAll(req, res, next, req.user._id);
    })
    .post(validate(validations.createSelf), (req, res, next) => {
        savingDepositController.create(req, res, next, req.user._id);
    });

router.route('/saving-deposits')
    .all(authentication.authenticate)
    .get(validate(validations.getAll), (req, res, next) => {
        savingDepositController.getAll(req, res, next, req.query.userId);
    })
    .post(validate(validations.create), (req, res, next) => {
        savingDepositController.create(req, res, next, req.body.userId);
    });

router.route('/users/self/saving-deposits/:id')
    .all(authentication.authenticate)
    .get(validate(validations.getByIdSelf), (req, res, next) => {
        savingDepositController.getById(req, res, next, req.user._id);
    })
    .put(validate(validations.updateSelf), (req, res, next) => {
        savingDepositController.update(req, res, next, req.user._id);
    })
    .delete(validate(validations.removeSelf), (req, res, next) => {
        savingDepositController.remove(req, res, next, req.user._id);
    });

router.route('/saving-deposits/:id')
    .all(authentication.authenticate)
    .get(validate(validations.getById), (req, res, next) => {
        savingDepositController.getById(req, res, next);
    })
    .put(validate(validations.update), (req, res, next) => {
        savingDepositController.update(req, res, next);
    })
    .delete(validate(validations.remove), (req, res, next) => {
        savingDepositController.remove(req, res, next);
    });

module.exports = router;