const debug = require("debug")("app:helpers:authorization.index");
const createError = require('http-errors');
const authorization = require("express-authz");

authorization.addRule("all access", function () {
    return true;
});
authorization.addRule("admin", function (req) {
    return req.user.role === 'ADMIN';
});
authorization.addRule("user manager", function (req) {
    return req.user.role === 'USER_MANAGER';
});
authorization.addRule("regular user", function (req) {
    return req.user.role === 'REGULAR_USER';
});

const policyNames = {
    ALL_ACCESS: 'ALL_ACCESS',
    CRUD_ALL_USERS: 'CRUD_ALL_USERS',
    CRUD_ALL_RECORDS: 'CRUD_ALL_RECORDS',
    CRUD_OWN_RECORDS: 'CRUD_OWN_RECORDS',
    CRUD_ADMIN_USERS: 'CRUD_ADMIN_USERS',
};

authorization.addPolicy(policyNames.ALL_ACCESS, ["all access"]);
authorization.addPolicy(policyNames.CRUD_ALL_USERS, ["admin", "user manager"]);
authorization.addPolicy(policyNames.CRUD_ALL_RECORDS, ["admin"]);
authorization.addPolicy(policyNames.CRUD_ADMIN_USERS, ["admin"]);
authorization.addPolicy(policyNames.CRUD_OWN_RECORDS, ["regular user"]);

module.exports = {
    authorization,
    policyNames
};