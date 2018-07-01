const userModel = require("../models/user.model");
const debug = require('debug')('sd:controllers:user.controller');
const bcrypt = require('bcrypt');
const config = require('config');
const createError = require('http-errors');
const imageHelper = require('../helpers/image.helper');

const userController = {
    update: async (req, res, next, userId) => {
        const {
            photo
        } = req.body;
        const fileName = await imageHelper.saveImageAndGetPath(photo);
        const affectedCount = await userModel.update({
            photo: `/static/${fileName}`
        }, {
            _id: userId
        });
        if (affectedCount) {
            return res.json({
                ok: true,
                message: `Profile picture is successfully updated.`
            });
        }
        next(new createError.InternalServerError());
    },
    updatePassword: async (req, res, next) => {
        debug('updatePassword');
        const {
            _id
        } = req.user;
        const {
            oldPassword,
            newPassword,
            confirmNewPassword
        } = req.body;
        debug(oldPassword,
            newPassword,
            confirmNewPassword);

        const user = await userModel.findOne({
            _id
        });
        const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isCorrectPassword) {
            debug('Password change failed. Please check your old password.');
            next(new createError.BadRequest('Password change failed. Please check your old password.'));
            return;
        }

        if (newPassword !== confirmNewPassword) {
            debug('Passwords do not match.');
            next(new createError.BadRequest('Passwords do not match.'));
            return;
        }
        debug('config.api.salt', config.api.salt);
        const oldPasswordHash = await bcrypt.hash(oldPassword, Number(config.api.salt));
        const newPasswordHash = await bcrypt.hash(newPassword, Number(config.api.salt));
        const affectedCount = await userModel.update({
            password: newPasswordHash
        }, {
            _id
        });
        if (affectedCount) {
            return res.json({
                ok: true,
                message: `Password is successfully updated.`
            });
        }
        next(new createError.InternalServerError());
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