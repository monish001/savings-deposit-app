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
router.route('/users/:userId/password/reset')
    .all(authentication.authenticate)
    .put(userController.resetPassword);
router.route('/users/:userId/login-retry-count/reset')
    .all(authentication.authenticate)
    .put(userController.resetRetryCount); //unblock user's login
router.route('/users/:userId')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.update(req, res, next, req.params.id);
    });
router.route('/users/regular_user')
    .all(authentication.authenticate)
    .post((req, res, next) => {userController.create(req, res, next, 'REGULAR_USER');});
router.route('/users/user_manager')
    .all(authentication.authenticate)
    .post((req, res, next) => {userController.create(req, res, next, 'USER_MANAGER');});
router.route('/users/admin')
    .all(authentication.authenticate)
    .post((req, res, next) => {userController.create(req, res, next, 'ADMIN');});
router.route('/users/invite')
    .all(authentication.authenticate)
    .post(userController.invite);
router.route('/users/:userId/admin/:newRole')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, 'admin', req.params.newRole)
    });
router.route('/users/:userId/:oldRole/admin')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'admin')
    });
router.route('/users/:userId/:oldRole/regular_user')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'regular_user')
    });
router.route('/users/:userId/:oldRole/user_manager')
    .all(authentication.authenticate)
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'user_manager')
    });
router.route('/users/regular_user/:userId')
    .all(authentication.authenticate)
    .delete((req, res, next) => {userController.remove(req, res, next, 'REGULAR_USER')});
router.route('/users/user_manager/:userId')
    .all(authentication.authenticate)
    .delete((req, res, next) => {userController.remove(req, res, next, 'USER_MANAGER')});
router.route('/users/admin/:userId')
    .all(authentication.authenticate)
    .delete((req, res, next) => {userController.remove(req, res, next, 'ADMIN')});
router.route('/users')
    .all(authentication.authenticate)
    .get(userController.getAll);

module.exports = router;
