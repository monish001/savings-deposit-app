const userSchema = require("./db/user.schema");
const debug = require('debug')('app:models:user.model');

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
    debug('findOne', 'user', user);
    let result;
    if (user.length === 1) {
        result = user[0];
    }
    debug('findOne', 'result', result);
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
        googleId,
        facebookId,
        photo,
    } = args;
    let user;
    try {
        user = await userSchema.create(removeUndefinedKeys({
            email,
            password,
            emailVerificationCode,
            isEmailVerified,
            role,
            googleId,
            facebookId,
            photo
        }));
    } catch (error) {
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
        googleId,
        facebookId,
        isEmailVerified,
        emailVerificationCode,
        password,
        retryCount,
        photo,
        role,
    } = args;
    const response = await userSchema.update(removeUndefinedKeys({
        googleId,
        facebookId,
        isEmailVerified,
        emailVerificationCode,
        password,
        retryCount,
        photo,
        role,
    }), {
        where: removeUndefinedKeys({
            emailVerificationCode: where.emailVerificationCode,
            password: where.password,
            _id: where._id,
            role: where.role,
        })
    });
    const affectedCount = response[0];
    debug('update', 'affectedCount', affectedCount);
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

async function getAll(where) {
    const users = await userSchema.findAll().map(el => {
        let user = el.get({
            plain: true
        });
        delete user.password;
        return user;
    });
    return users;
}

module.exports = {
    findOne,
    create,
    update,
    increment,
    remove,
    getAll,
};