const userSchema = require("./db/user.schema");
const debug = require('debug')('sd:models:user.model');

async function findOne(where) {
    const {
        email
    } = where;
    const user = await userSchema.findAll({
        where: {
            email
        },
        attributes: {
            exclude: []
        }
    }).map(el => el.get({
        plain: true
    }));
    let result;
    if(user.length === 1) {
        result = user[0];
    }
    debug('findOne', result);
    return result;
}

async function create(args) {
    const {
        email,
        password,
        emailVerificationCode
    } = args;
    const user = await userSchema.create({
        email,
        password,
        emailVerificationCode
    });
    const userJson = user.get({
        plain: true
    });
    delete userJson.password;    
    debug('create', userJson)
    return userJson;
}

async function update(args, where) {
    debug(args, where);
    const {
        isEmailVerified,
        emailVerificationCode,
        password
    } = args;
    const oldEmailVerificationCode = where.emailVerificationCode;
    const response = await userSchema.update({
        isEmailVerified,
        emailVerificationCode,
        password
    }, {
        where: {
            emailVerificationCode: oldEmailVerificationCode,
            password: where.password,
        }
    });
    const affectedCount = response[0];
    debug('update', affectedCount)
    return affectedCount;
}

module.exports = {
    findOne,
    create,
    update,
};