const Sequelize = require("sequelize");
const sequelize = require("./connection");
const debug = require('debug')('sd:models:db:saving-deposit.schema');
const User = require('./user.schema');

// Model file for the table imageInfo
// which maps to each fields in the DB
// @links http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init
// @links http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const SavingDeposit = sequelize.define(
    "savingDeposit", {
        _id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        bankName: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        accountNumber: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        initialAmount: {
            type: Sequelize.DECIMAL(10, 2),
            validate: {
                notEmpty: true
            }
        },
        startDate: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true
            }
        },
        endDate: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true
            }
        },
        interest: {
            type: Sequelize.DECIMAL(10, 2),
            validate: {
                notEmpty: true
            }
        },
        tax: {
            type: Sequelize.DECIMAL(10, 2),
            validate: {
                notEmpty: true
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
SavingDeposit.belongsTo(User);
sequelize.sync({force: false}).then(() => {
    debug('Saving deposit table created if not there, successfully.');
  }).catch(error => {
    debug('// oooh, did you enter wrong database credentials?', error);
  });
module.exports = SavingDeposit;