const userModel = require("../models/user.model");
const debug = require('debug')('sd:controllers:user.controller');

const userController = {
    update: (req,res, next, userId)=>{
        res.json();
    },
    updatePassword: (req,res, next)=>{
        res.json();
    },
    resetPassword: (req,res, next)=>{
        res.json();
    },
    resetRetryCount: (req,res, next)=>{
        res.json();
    },
    createRegularUser: (req,res, next)=>{
        res.json();
    },
    createUserManager: (req,res, next)=>{
        res.json();
    },
    createAdmin: (req,res, next)=>{
        res.json();
    },
    invite: (req,res, next)=>{
        res.json();
    },
    getAll: (req,res, next)=>{
        res.json();
    },
    updateRole: (req,res, next, currentRole, newRole)=>{
        res.json();
    },
    removeRegularUser: (req,res, next)=>{
        res.json();
    },
    removeUserManager: (req,res, next)=>{
        res.json();
    },
    removeAdmin: (req,res, next)=>{
        res.json();
    },
};

module.exports = userController;