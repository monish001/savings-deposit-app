require('babel-register')({
    presets: ['es2015-node6']
});
require('dotenv').config() // Read environment variable from .env file

/**
 * Test reading for env variables
 */
console.log('***', process.env.GOOGLE_SECRET);
var config = require('config');
console.log('***', config.authentication.google.secret);

require('./www');