const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('Poi:', () => {

  before( done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on( 'open', drop );
  });

  const request = chai.request(app);
  let token = '';
  let somePark = {
    property: 'some park',
    type: 'park',
    address: '123 some st',
    zip: '97214',
    subArea: 'NW',
    hours: 'dawn to dusk',
    geo: [-122.550905,45.509017]
  };
  let compare = {
    property: 'compare museum',
    type: 'museum',
    address: '123 some st',
    zip: '97204',
    subArea: 'SW',
    geo: [-122.616553,45.496292],
    hours: 'dawn to dusk'
  };;

  before(done => {
    request
      .post('/api/auth/signup')
      .send({email:'poi@somebody.com', password:'password', firstName: 'first-name', admin: true})
      .then(res => {
        token = res.body.token; 
      })
      .then(done)
      .catch(done);
  });

  before(done => {
    request
      .post('/api/admin')
      .set('authorization', token)
      .send(somePark)
      .then(res => {
        somePark = res.body;
        done();
      })
      .catch(done);
  });

  it('GETs all', done => {
    request
      .get('/api')
      .then(res => {
        let expected = { 
          property: somePark.property,
          type: somePark.type,
          address: somePark.address,
          hours: somePark.hours,
          _id: somePark._id,
          zip: somePark.zip
        };
        assert.deepEqual(res.body, [expected]);
        done();
      })
      .catch(done);
  });

  it('GETs by id', done => {
    request
      .get(`/api/id/${somePark._id}`)
      .set('authorization', token)
      .then(res => {
        const poi = res.body;
        let expected = { 
          property: somePark.property,
          type: somePark.type,
          address: somePark.address,
          hours: somePark.hours,
          subArea: somePark.subArea,
          zip: somePark.zip,
          reviews: somePark.reviews,
          stars: somePark.stars,
          amenities: somePark.amenities,
          __v: somePark.__v };
        assert.deepEqual(poi, expected);
        done();
      })
      .catch(done);
  });


  it('Gets by type', done => {
    request
      .post('/api/admin')
      .set('authorization', token)
      .send(compare)
      .then(res => {
        compare = res.body;
        return request 
          .get('/api/type/museum')
          .then(res => {
            let response = res.body;
            let expected = { 
              property: compare.property,
              type: compare.type,
              address: compare.address,
              hours: compare.hours,
              _id: compare._id,
              zip: Number(compare.zip)};
            assert.deepEqual(response, [expected]);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it('Gets by zip', done => {
    request
      .get('/api/zip/97214')
      .then(res => {
        let response = res.body;
        let expected = {
          property: somePark.property,
          type: somePark.type,
          address: somePark.address,
          hours: somePark.hours,
          _id: somePark._id,
          zip: Number(somePark.zip)
        };
        assert.deepEqual(response, [expected]);
        done();
      })
      .catch(done);
  });

  it('Gets by area', done => {
    request
      .get('/api/area/SW')
      .then(res => {
        let response = res.body;
        let expected = {
          property: compare.property,
          type: compare.type,
          address: compare.address,
          hours: compare.hours,
          _id: compare._id,
          zip: Number(compare.zip)
        };
        assert.deepEqual(response, [expected]);
        done();
      })
      .catch(done);
  });

});
