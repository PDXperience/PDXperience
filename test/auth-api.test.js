const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');


describe('Authorization:', () => {
  
  const request = chai.request(app);
  let firstToken = '';

  // DRY!
  function testBadSignup(user) {
    request
      .post('/api/auth/signup')
      .send(user)
      .then(res => done('Error: status should not be 200', res))
      .catch(res => {
        assert.equal(res.status, 400);
        assert.equal(res.response.text, '{"error":"Email, password, and first name are required to sign up."}');
        done();
      });
  }

  it('Requires a password to signup', done => {
    testBadSignup({email:'new@somebody.com', firstName: 'first', admin: false});
  });

  it('Requires an email to signup', done => {
    testBadSignup({password:'password', firstName: 'first', admin: false});
  });

  it('Requires a name to signup', done => {
    testBadSignup({password:'password', email: 'first@name.com', admin: false});
  });

  it('Allows a new user to signup', done => {
    request
      .post('/api/auth/signup')
      .send({email:'new@somebody.com', password:'password', firstName: 'first', admin: false})
      .then(res => {
        assert.ok(res.body.token);
        firstToken = res.body.token;
        done();
      })
      .catch(done);
  });

  it('Allows a new admin to signup', done => {
    request
      .post('/api/auth/signup')
      .send({email:'newadmin@somebody.com', password:'password', firstName: 'first', admin: true})
      .then(res => {
        assert.ok(res.body.token);
        done();
      })
      .catch(done);
  });

  it('Errors if you sign up with an already taken email address', done => {
    request
      .post('/api/auth/signup')
      .send({email:'new@somebody.com', password:'other', firstName: 'second', admin: false})
      .then(res => done('Error: status should not be 200', res))
      .catch(res => {
        assert.equal(res.status, 400);
        assert.equal(res.response.text, '{"error":"Username new@somebody.com already taken."}');
        done();
      });
  });

  it('Allows an admin to sign in', done => {
    request
      .post('/api/auth/signup')
      .send({email:'somebody@somebody.com', password:'password', firstName: 'first-name', admin: true})
      .then(res => {
        assert.ok(res.body.token);
      })
      .then(done)
      .catch(done);
  });

});
