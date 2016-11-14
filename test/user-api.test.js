const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');


describe('User:', () => {

  before( done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on( 'open', drop );
  });

  const request = chai.request(app);
  let firstToken = '';

  const somePark = {
    name: 'some park',
    type: 'park',
    location: '123 some st',
    hours: 'dawn to dusk'
  };

  it.only('Requires a password to signup', done => {
    request
      .post('/api/auth/signup')
      .send({email:'new@somebody.com', firstName: 'first', admin: false})
      .then(res => done('Error: status should not be 200', res))
      .catch(res => {
        assert.equal(res.status, 400);

        assert.equal(res.response.text, '{"error":"Email, password, and first name are required to sign up."}');
        done();
      });

  });

  it('Allows a new user to signup', done => {
    request
      .post('/api/auth/signup')
      .send({email:'new@somebody.com', password:'password', firstName: 'first', admin: false})
      .then(res => {
        assert.ok(res.body.token);
        firstToken = res.body.token;
      })
      .then(done)
      .catch(done);

  });

});
