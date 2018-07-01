const Sequelize = require("sequelize");
const sequelize = require("./connection");
const debug = require('debug')('sd:models:db:user.schema');

// Model file for the table imageInfo
// which maps to each fields in the DB
// @links http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init
// @links http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const user = sequelize.define(
    "user", {
        _id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            },
            allowNull: false,
            unique: true,
        },
        role: {
            type: Sequelize.ENUM('REGULAR_USER', 'USER_MANAGER', 'ADMIN'),
            validate: {
                notEmpty: true
            },
            allowNull: false,
            defaultValue: 'REGULAR_USER'
        },
        password: {
            type: Sequelize.STRING,
            validate: {}
        },
        photo: {
            type: Sequelize.STRING,
            validate: {}
        },
        googleId: {
            type: Sequelize.STRING,
            validate: {}
        },
        facebookId: {
            type: Sequelize.STRING,
            validate: {}
        },
        isEmailVerified: {
            type: Sequelize.BOOLEAN,
            validate: {
                notEmpty: true
            },
            defaultValue: false
        },
        retryCount: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true
            },
            allowNull: false,
            defaultValue: 0
        },
        emailVerificationCode: {
            type: Sequelize.STRING,
            validate: {
            }
        }
    }, {
        // add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
        // to the model and throw an OptimisticLockingError error when stale instances are saved.
        // Set to true or a string with the attribute name you want to use to enable.        
        version: true
    }
);

sequelize.sync({
    force: false
}).then(() => {
    debug('User table created if not there, successfully.');
}).catch(error => {
    debug('// oooh, did you enter wrong database credentials?', error);
});
module.exports = user;