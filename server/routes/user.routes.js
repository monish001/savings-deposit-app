var express = require('express');
var userController = require('../controllers/user.controller');
const router = express.Router();

router.route('/users/self')
     .put((req, res, next) => {userController.update(req, res, next, req.user._id);});
router.route('/users/self/password')
     .put(userController.updatePassword);
router.route('/users/:id')
     .put((req, res, next) => {userController.update(req, res, next, req.params.id);});
router.route('/users/:id/password/reset')
     .put(userController.resetPassword);
router.route('/users/:id/login-retry-count/reset')
     .put(userController.resetRetryCount); //unblock user's login
router.route('/users/regular_user')
     .post(userController.createRegularUser);
router.route('/users/user_manager')
     .post(userController.createUserManager);
router.route('/users/admin')
     .post(userController.createAdmin);
router.route('/users/invite')
     .post(userController.invite);
router.route('/users')
     .get(userController.getAll);
router.route('/users/:id/admin/:newRole')
     .put((req, res, next) => {userController.updateRole(req, res, next, 'admin', req.params.newRole)});
router.route('/users/:id/:oldRole/admin')
     .put((req, res, next) => {userController.updateRole(req, res, next, req.params.oldRole, 'admin')});
router.route('/users/:id/:oldRole/regular_user')
     .put((req, res, next) => {userController.updateRole(req, res, next, req.params.oldRole, 'regular_user')});
router.route('/users/:id/:oldRole/user_manager')
     .put((req, res, next) => {userController.updateRole(req, res, next, req.params.oldRole, 'user_manager')});
router.route('/users/regular_user/:id')
     .delete(userController.removeRegularUser);
router.route('/users/user_manager/:id')
     .delete(userController.removeUserManager);
router.route('/users/admin/:id')
     .delete(userController.removeAdmin);

module.exports = router;


/**

router.route('/users/self/saving-deposits')
    .get(savingDepositController.getAll)
    .post(savingDepositController.create);

router.route('/users/self/saving-deposits/:id')
    .get(savingDepositController.getById)
    .put(savingDepositController.update)
    .delete(savingDepositController.remove);
    
    
*/