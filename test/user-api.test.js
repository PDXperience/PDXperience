const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('User requests:', () => {

  before( done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on( 'open', drop );
  });

  const request = chai.request(app);
  let token = '';

  const somePark = {
    property: 'some park',
    type: 'park',
    address: '123 some st',
    hours: 'dawn to dusk'
  };

  before(done => {
    request
      .post('/api/auth/signup')
      .send({email:'somebody@somebody.com', password:'password', firstName: 'first-name', admin: true})
      .then(res => {
        console.log('user: ', res.body);
        assert.ok(res.body.token);
        token = res.body.token;
      })
      .then(res => {
        return request
          .post('/api/admin')
          .set('authorization', token)
          .send(somePark);
      })
      .then(res => {
        somePark._id = res.body._id;
        console.log('poi: ', res.body);
        assert.ok(res.body);
        done();
      })
      .catch(done);
  });

  it('GETs itineraries', done => {
    request
      .get('/api/me/itineraries')
      .set('authorization', token)
      .then(res => {
        let expected = {savedPoi: []};
        console.log('res: ', res.body);
        assert.deepEqual(res.body, expected);
        done();
      })
      .catch(done);
  });

  it('PUTs poi in itineraries', done => {
    request
      .put('/api/me/itineraries')
      .set('authorization', token)
      .send({poiId: somePark._id})
      .then(res => {
        let expected = [somePark._id];
        let itinerary = res.body.savedPoi;
        assert.deepEqual(expected, itinerary);
        done(); 
      })
      .catch(done);
  });








});
