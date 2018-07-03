const { setWorldConstructor } = require('cucumber');
const scope = require('./support/scope');
const puppeteer = require('puppeteer');
const webApp = require('../server/bin/www-e2e-tests');

class CustomWorld {
  constructor() {
    scope.host = webApp.host;
    scope.driver = puppeteer;
    scope.context = {};
    scope.webApp = webApp;
  }
}

setWorldConstructor(CustomWorld);