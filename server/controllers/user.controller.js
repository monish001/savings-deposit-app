const userModel = require("../models/user.model");
const debug = require('debug')('sd:controllers:user.controller');
const bcrypt = require('bcrypt');
const config = require('config');
const createError = require('http-errors');
const imageHelper = require('../helpers/image.helper');
var emailHelper = require('../helpers/email.helper');
const uuidv4 = require('uuid/v4');

async function sendAccountCreationNotificationEmail(email, newPassword) {
    const {
        subject,
        text,
        html
    } = config.email.accountCreation;
    const emailText = text.replace(/%NewPassword%/g, newPassword);
    const emailHtml = html.replace(/%NewPassword%/g, newPassword);
    const isOk = await emailHelper.sendEmail(email, subject, emailText, emailHtml);
    return isOk;
}
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
        if (!user) {
            debug('updatePassword', 'user', user);
            next(new createError.InternalServerError());
            return;
        }
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
    resetPassword: async (req, res, next) => {
        debug('resetPassword');
        const {
            userId
        } = req.params;
        const user = await userModel.findOne({
            _id: userId
        });
        if (!user) {
            debug('resetPassword', 'user', user);
            next(new createError.InternalServerError());
            return;
        }
        const newPassword = uuidv4();
        const newPasswordHash = await bcrypt.hash(newPassword, Number(config.api.salt));

        const {
            subject,
            text,
            html
        } = config.email.passwordReset;
        const emailText = text.replace(/%NewPassword%/g, newPassword);
        const emailHtml = html.replace(/%NewPassword%/g, newPassword);
        const isOk = await emailHelper.sendEmail(user.email, subject, emailText, emailHtml);
        if (!isOk) {
            debug('resetPassword', 'isOk', isOk);
            next(new createError.InternalServerError());
            return;
        }

        const affectedCount = await userModel.update({
            password: newPasswordHash
        }, {
            _id: userId
        });
        if (!affectedCount) {
            debug('resetPassword', 'affectedCount', affectedCount);
            next(new createError.InternalServerError('Reset password failed. Please ignore the related email.'));
            return;
        }
        return res.json({
            ok: true,
            message: `Password is successfully reset.`
        });
    },
    resetRetryCount: async (req, res, next) => {
        debug('resetRetryCount');
        const {
            userId
        } = req.params;
        const affectedCount = await userModel.update({
            'retryCount': 0
        }, {
            _id: userId
        });
        debug('resetRetryCount', 'affectedCount', affectedCount);
        if (!affectedCount) {
            debug('resetRetryCount', 'affectedCount', affectedCount);
            next(new createError.InternalServerError('Request for unblock user log in failed.'));
            return;
        }
        return res.json({
            ok: true,
            message: `User log in unblocked successfully.`
        });
    },
    create: async (req, res, next, role) => {
        debug('create');
        const {
            email
        } = req.body;
        const newPassword = uuidv4();
        const newPasswordHash = await bcrypt.hash(newPassword, Number(config.api.salt));
        const user = await userModel.create({
            email,
            password: newPasswordHash,
            isEmailVerified: true,
            role
        });
        debug('create', 'user', user);
        if (!user || !user.email) {
            const errors = user;
            if(errors[0] && errors[0].type === "unique violation") {
                next(new createError.BadRequest(`Request for new user creation failed. ${errors[0].message}`));
                return;
            }
            next(new createError.InternalServerError(`Request for new user creation failed.`));
            return;
        }

        const isOk = await sendAccountCreationNotificationEmail(user.email, newPassword);
        if (!isOk) {
            debug('create', 'isOk', isOk);
            next(new createError.InternalServerError('New user record created but email notification to the user failed.'));
            return;
        }
        return res.json({
            ok: true,
            message: `New user record created successfully with role - ${user.role}.`
        });
    },
    invite: async (req, res, next) => {
        next(new createError.NotImplemented());
    },
    getAll: async (req, res, next) => {
        next(new createError.NotImplemented());
    },
    updateRole: async (req, res, next, currentRole, newRole) => {
        next(new createError.NotImplemented());
    },
    remove: async (req, res, next, allowedRoleToDelete) => {
        debug('remove');
        const {userId} = req.params;
        const affectedCount = await userModel.remove({_id: userId, role: allowedRoleToDelete});
        debug('remove', 'affectedCount', affectedCount);
        if(affectedCount) {
            return res.json({
                ok: true,
                message: "User deleted successfully.",
            });
        }
        next(new createError.BadRequest('User deletion failed.'));
    },
};

module.exports = userController;