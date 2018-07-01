const userSchema = require("./db/user.schema");
const debug = require('debug')('sd:models:user.model');

function removeUndefinedKeys(args) {
    return JSON.parse(JSON.stringify(args));
}

async function findOne(where) {
    debug('findOne', 'where', where);
    const {
        email,
        _id
    } = where;
    const user = await userSchema.findAll({
        where: removeUndefinedKeys({
            email,
            _id
        }),
        attributes: {
            exclude: []
        }
    }).map(el => el.get({
        plain: true
    }));
    let result;
    if (user.length === 1) {
        result = user[0];
    }
    debug('findOne', result);
    return result;
}

async function create(args) {
    debug('create');
    const {
        email,
        password,
        emailVerificationCode,
        isEmailVerified,
        role,
    } = args;
    let user;
    try {
        user = await userSchema.create(removeUndefinedKeys({
            email,
            password,
            emailVerificationCode,
            isEmailVerified,
            role,
        }));
    } catch(error){
        debug('create', 'error', JSON.stringify(error));            
        return error && error.errors;
    }
    debug('create', 'user', user);            
    const userJson = user.get({
        plain: true
    });
    delete userJson.password;
    debug('create', 'userJson', userJson)
    return userJson;
}

async function update(args, where) {
    debug('update', args, where);
    const {
        isEmailVerified,
        emailVerificationCode,
        password,
        retryCount,
        photo
    } = args;
    const response = await userSchema.update(removeUndefinedKeys({
        isEmailVerified,
        emailVerificationCode,
        password,
        retryCount,
        photo,
    }), {
        where: removeUndefinedKeys({
            emailVerificationCode: where.emailVerificationCode,
            password: where.password,
            _id: where._id,
        })
    });
    const affectedCount = response[0];
    debug('update', affectedCount);
    return affectedCount;
}

async function increment(field, where) {
    const {
        _id
    } = where;
    const response = await userSchema.increment(field, {
        where: {
            _id
        }
    });
    debug('increment', response);
    const affectedCount = response[0];
    debug('increment', affectedCount);
    return affectedCount;
}

async function remove(where) {
    const {
        _id,
        role
    } = where;
    const affectedCount = await userSchema.destroy({
        where: removeUndefinedKeys({
            _id,
            role
        })
    });
    debug('remove', 'affectedCount', affectedCount);
    return affectedCount;
}

module.exports = {
    findOne,
    create,
    update,
    increment,
    remove,
};