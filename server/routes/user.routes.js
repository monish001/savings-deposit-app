var express = require('express');
var userController = require('../controllers/user.controller');
const router = express.Router();
const authentication = require('../authentication');
const debug = require('debug')('sd:routes:user.routes');

router.route('/users/self/password')
    .all(authentication.authenticate)
    .put(userController.updatePassword);
router.route('/users/self')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.update(req, res, next, req.user._id);
    });
router.route('/users/:id/password/reset')
    .all(authentication.authenticate)
    .put(userController.resetPassword);
router.route('/users/:id/login-retry-count/reset')
    .all(authentication.authenticate)
    .put(userController.resetRetryCount); //unblock user's login
router.route('/users/:id')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.update(req, res, next, req.params.id);
    });
router.route('/users/regular_user')
    .all(authentication.authenticate)
    .post(userController.createRegularUser);
router.route('/users/user_manager')
    .all(authentication.authenticate)
    .post(userController.createUserManager);
router.route('/users/admin')
    .all(authentication.authenticate)
    .post(userController.createAdmin);
router.route('/users/invite')
    .all(authentication.authenticate)
    .post(userController.invite);
router.route('/users/:id/admin/:newRole')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, 'admin', req.params.newRole)
    });
router.route('/users/:id/:oldRole/admin')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'admin')
    });
router.route('/users/:id/:oldRole/regular_user')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'regular_user')
    });
router.route('/users/:id/:oldRole/user_manager')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'user_manager')
    });
router.route('/users/regular_user/:id')
    .all(authentication.authenticate)
    .delete(userController.removeRegularUser);
router.route('/users/user_manager/:id')
    .all(authentication.authenticate)
    .delete(userController.removeUserManager);
router.route('/users/admin/:id')
    .all(authentication.authenticate)
    .delete(userController.removeAdmin);
router.route('/users')
    .all(authentication.authenticate)
    .get(userController.getAll);

module.exports = router;
