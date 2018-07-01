var express = require('express');
var savingDepositController = require('../controllers/saving-deposit.controller');
const router = express.Router();
const debug = require('debug')('sd:routes:saving-deposit.routes');
const authentication = require('../authentication');

router.route('/users/self/saving-deposits')
    .all(authentication.authenticate)
    .get((req, res, next) => {
        debug('req.user', req.user);
        savingDepositController.getAll(req, res, next, req.user._id);
    })
    .post((req, res, next) => {
        savingDepositController.create(req, res, next, req.user._id);
    });

router.route('/saving-deposits')
    .all(authentication.authenticate)
    .get((req, res, next) => {
        savingDepositController.getAll(req, res, next, req.query.userId);
    })
    .post((req, res, next) => {
        savingDepositController.create(req, res, next, req.body.userId);
    });

router.route('/users/self/saving-deposits/:id')
    .all(authentication.authenticate)
    .get((req, res, next) => {
        savingDepositController.getById(req, res, next, req.user._id);
    })
    .put((req, res, next) => {
        savingDepositController.update(req, res, next, req.user._id);
    })
    .delete((req, res, next) => {
        savingDepositController.remove(req, res, next, req.user._id);
    });

router.route('/saving-deposits/:id')
    .all(authentication.authenticate)
    .get((req, res, next) => {
        savingDepositController.getById(req, res, next);
    })
    .put((req, res, next) => {
        savingDepositController.update(req, res, next);
    })
    .delete((req, res, next) => {
        savingDepositController.remove(req, res, next);
    });

module.exports = router;