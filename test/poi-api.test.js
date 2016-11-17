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

  before(done => {
    request
      .post('/api/auth/signup')
      .send({email:'somebody@somebody.com', password:'password', firstName: 'first-name', admin: true})
      .then(res => {
        assert.ok(res.body.token);
        token = res.body.token; 
      })
      .then(done)
      .catch(done);
  });

  const somePark = {
    property: 'some park',
    type: 'park',
    address: '123 some st',
    hours: 'dawn to dusk'
  };

  it('GETs all', done => {
    request
      .get('/api')
      .then( res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('POSTs a new poi', done => {
    request
      .post('/api/admin')
      .set('authorization', token)
      .send(somePark)
      .then(res => {
        const poi = res.body;
        assert.ok(poi._id);
        somePark.__v = 0;
        somePark._id = poi._id;
        somePark.reviews = poi.reviews;
        somePark.amenities = poi.amenities;
        somePark.stars = poi.stars;
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
          reviews: somePark.reviews,
          stars: somePark.stars,
          amenities: somePark.amenities,
          __v: somePark.__v };
        assert.deepEqual(poi, expected);
        done();
      })
      .catch(done);
  });

  it('GETs all after post', done => {
    request
      .get('/api')
      .then(res => {
        let expected = { 
          property: somePark.property,
          type: somePark.type,
          address: somePark.address,
          hours: somePark.hours,
          _id: somePark._id
        };
        assert.deepEqual(res.body, [expected]);
        done();
      })
      .catch(done);
  });

  it('DELETEs a poi', done => {
    request
      .delete(`/api/admin/poi/${somePark._id}`)
      .set('authorization', token)
      .then(res => {
        assert.deepEqual(res.body, somePark);
        done();
      })
      .catch(done);
  });

});
