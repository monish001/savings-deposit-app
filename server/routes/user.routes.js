var express = require('express');
var userController = require('../controllers/user.controller');
const router = express.Router();
const authentication = require('../helpers/authentication.helper');
const {authorization, policyNames} = require('../helpers/authorization.helper');
const debug = require('debug')('sd:routes:user.routes');
const validations = require('./validations/user.validations'); // @todo
const validate = require('express-validation');

router.route('/users/self/password')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.ALL_ACCESS))
    .put(validate(validations.updatePasswordSelf), userController.updatePassword);
router.route('/users/self')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.ALL_ACCESS))
    .put(validate(validations.updateSelf), (req, res, next) => {
        userController.update(req, res, next, req.user._id);
    });
router.route('/users/:userId/password/reset')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .put(validate(validations.resetPassword), userController.resetPassword);
router.route('/users/:userId/login-retry-count/reset')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .put(validate(validations.resetRetryCount), userController.resetRetryCount); //unblock user's login
router.route('/users/:userId')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .put(validate(validations.update), (req, res, next) => {
        userController.update(req, res, next, req.params.id);
    });
router.route('/users/regular_user')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .post(validate(validations.create), (req, res, next) => {userController.create(req, res, next, 'REGULAR_USER');});
router.route('/users/user_manager')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .post(validate(validations.create), (req, res, next) => {userController.create(req, res, next, 'USER_MANAGER');});
router.route('/users/admin')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ADMIN_USERS))
    .post(validate(validations.create), (req, res, next) => {userController.create(req, res, next, 'ADMIN');});
router.route('/users/invite')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ADMIN_USERS))
    .post(validate(validations.invite), userController.invite);
router.route('/users/:userId/admin/:role')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ADMIN_USERS))
    .put(validate(validations.updateRole), (req, res, next) => {
        userController.updateRole(req, res, next, 'ADMIN', req.params.role.toUpperCase())
    });
router.route('/users/:userId/:role/admin')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ADMIN_USERS))
    .put(validate(validations.updateRole), (req, res, next) => {
        userController.updateRole(req, res, next, req.params.role.toUpperCase(), 'ADMIN')
    });
router.route('/users/:userId/:role/regular_user')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .put(validate(validations.updateRole), (req, res, next) => {
        userController.updateRole(req, res, next, req.params.role.toUpperCase(), 'REGULAR_USER')
    });
router.route('/users/:userId/:role/user_manager')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .put(validate(validations.updateRole), (req, res, next) => {
        userController.updateRole(req, res, next, req.params.role.toUpperCase(), 'USER_MANAGER')
    });
router.route('/users/regular_user/:userId')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .delete((req, res, next) => {userController.remove(req, res, next, 'REGULAR_USER')});
router.route('/users/user_manager/:userId')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .delete((req, res, next) => {userController.remove(req, res, next, 'USER_MANAGER')});
router.route('/users/admin/:userId')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ADMIN_USERS))
    .delete((req, res, next) => {userController.remove(req, res, next, 'ADMIN')});
router.route('/users')
    .all(authentication.authenticate)
    .all(authorization.enforcePolicy(policyNames.CRUD_ALL_USERS))
    .get(validate(validations.getAll), userController.getAll);

module.exports = router;
