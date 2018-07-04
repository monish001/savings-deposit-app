'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server/app'); // Our app

describe('API endpoint /api/saving-deposits', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function(done) {
    (async () => {
      const response = await chai.request(app)
      .post('/api/login')
      .send({"email":"saving.deposits.app+11@gmail.com","password":"qwerty"});  
      done();
    })();
  });

  after(function() {

  });

  // GET - List all colors
  it('should return all colors', function() {
    return chai.request(app)
      .get('/api/users/self/saving-deposits')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array');
      });
  });

  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/api/INVALID_PATH')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });
});