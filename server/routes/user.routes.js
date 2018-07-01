var express = require('express');
var userController = require('../controllers/user.controller');
const router = express.Router();
const passport = require('passport');
const debug = require('debug')('sd:routes:user.routes');

router.route('/users/self/password')
    .all((req, res, next) => {
        debug('test');
        next();
    })
    .all(passport.authenticate('local'))
    .put(userController.updatePassword);
router.route('/users/self')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.update(req, res, next, req.user._id);
    });
router.route('/users/:id/password/reset')
    .all(passport.authenticate('local'))
    .put(userController.resetPassword);
router.route('/users/:id/login-retry-count/reset')
    .all(passport.authenticate('local'))
    .put(userController.resetRetryCount); //unblock user's login
router.route('/users/:id')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.update(req, res, next, req.params.id);
    });
router.route('/users/regular_user')
    .all(passport.authenticate('local'))
    .post(userController.createRegularUser);
router.route('/users/user_manager')
    .all(passport.authenticate('local'))
    .post(userController.createUserManager);
router.route('/users/admin')
    .all(passport.authenticate('local'))
    .post(userController.createAdmin);
router.route('/users/invite')
    .all(passport.authenticate('local'))
    .post(userController.invite);
router.route('/users/:id/admin/:newRole')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.updateRole(req, res, next, 'admin', req.params.newRole)
    });
router.route('/users/:id/:oldRole/admin')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'admin')
    });
router.route('/users/:id/:oldRole/regular_user')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'regular_user')
    });
router.route('/users/:id/:oldRole/user_manager')
    .all(passport.authenticate('local'))
    .put((req, res, next) => {
        userController.updateRole(req, res, next, req.params.oldRole, 'user_manager')
    });
router.route('/users/regular_user/:id')
    .all(passport.authenticate('local'))
    .delete(userController.removeRegularUser);
router.route('/users/user_manager/:id')
    .all(passport.authenticate('local'))
    .delete(userController.removeUserManager);
router.route('/users/admin/:id')
    .all(passport.authenticate('local'))
    .delete(userController.removeAdmin);
router.route('/users')
    .all(passport.authenticate('local'))
    .get(userController.getAll);

module.exports = router;
