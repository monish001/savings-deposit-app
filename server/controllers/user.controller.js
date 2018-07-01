const userModel = require("../models/user.model");
const debug = require('debug')('sd:controllers:user.controller');
const bcrypt = require('bcrypt');
const config = require('config');
var createError = require('http-errors');

const userController = {
    update: (req, res, next, userId) => {
        next(new createError.NotImplemented());
    },
    updatePassword: async (req, res, next) => {
        debug('updatePassword');
        const {
            oldPassword,
            newPassword,
            confirmNewPassword
        } = req.body;
        debug(oldPassword,
            newPassword,
            confirmNewPassword);
        if (newPassword !== confirmNewPassword) {
            debug('Passwords do not match.');
            next(new createError.BadRequest('Passwords do not match.'));
            return;
        }
        const oldPasswordHash = await bcrypt.hash(oldPassword, Number(config.api.salt));
        const newPasswordHash = await bcrypt.hash(newPassword, Number(config.api.salt));
        const affectedCount = await userModel.update({
            password: newPasswordHash
        }, {
            password: oldPasswordHash
        });
        if (affectedCount) {
            return res.json({
                ok: true,
                message: `Password is successfully updated.`
            });
        }
        next(new createError.InternalServerError('Password change failed.'));
    },
    resetPassword: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    resetRetryCount: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    createRegularUser: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    createUserManager: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    createAdmin: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    invite: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    getAll: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    updateRole: (req, res, next, currentRole, newRole) => {
        next(new createError.NotImplemented());
    },
    removeRegularUser: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    removeUserManager: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    removeAdmin: (req, res, next) => {
        next(new createError.NotImplemented());
    },
};

module.exports = userController;