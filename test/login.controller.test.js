'use strict';

const chai = require('chai');
const expect = require('chai').expect;

const loginController = require('../server/controllers/login.controller'); // Our app

describe('login controller', function () {
  this.timeout(5000); // How long to wait for a response (ms)
  describe('register', () => {

    it('should return error when passwords mismatch', (done) => {
      const req = {
          body: {
            "email": "saving.deposits.app+4@gmail.com",
            "password": "qwerty",
            "cpassword": "qwerty123",
          }
        },
        res = {};
      const next = (results) => {
        expect(results.status).to.equal(400);
        expect(results.message).to.equal('Passwords do not match.');
        done();
      };

      loginController.register(req, res, next);
    });
  });
});