var express = require('express');
var userController = require('../controllers/user.controller');
const router = express.Router();

router.route('/')
     .get(userController.getUsers)
     .post(userController.addUser)
     .put(userController.updateUser);
router.route('/:id')
      .get(userController.getUser)
      .delete(userController.deleteUser);

module.exports = router;
