var express = require('express');
var savingDepositController = require('../controllers/saving-deposit.controller');
const router = express.Router();

router.route('/users/self/saving-deposits')
    .get(savingDepositController.getAll)
    .post(savingDepositController.create);

router.route('/users/self/saving-deposits/:id')
    .get(savingDepositController.getById)
    .put(savingDepositController.update)
    .delete(savingDepositController.remove);

module.exports = router;