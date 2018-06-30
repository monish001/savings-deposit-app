var express = require('express');
var savingDepositController = require('../controllers/saving-deposit.controller');
const router = express.Router();

router.route('/users/self/saving-deposits')
    .get((req, res, next) => {savingDepositController.getAll(req, res, next, req.user._id);})
    .post((req, res, next) => {savingDepositController.create(req, res, next, req.user._id);});

router.route('/saving-deposits')
    .get((req, res, next) => {savingDepositController.getAll(req, res, next, req.params.userId);})
    .post((req, res, next) => {savingDepositController.create(req, res, next, req.body.userId);});

router.route('/users/self/saving-deposits/:id')
    .get((req, res, next) => {savingDepositController.getById(req, res, next, req.user._id);})
    .put((req, res, next) => {savingDepositController.update(req, res, next, req.user._id);})
    .delete((req, res, next) => {savingDepositController.remove(req, res, next, req.user._id);});

router.route('/saving-deposits/:id')
    .get((req, res, next) => {savingDepositController.getById(req, res, next);})
    .put((req, res, next) => {savingDepositController.update(req, res, next);})
    .delete((req, res, next) => {savingDepositController.remove(req, res, next);});

module.exports = router;