require('babel-register')({
    presets: ['es2015-node6']
});
require('dotenv').config() // Read environment variable from .env file
require('./www');