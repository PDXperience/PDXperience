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
    name: 'some park',
    type: 'park',
    location: '123 some st',
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
        assert.deepEqual(poi, somePark);
        done();
      })
      .catch(done);
  });

  it('GETs all after post', done => {
    request
      .get('/api')
      .then(res => {
        assert.deepEqual(res.body, [somePark]);
        done();
      })
      .catch(done);
  });

  it('DELETEs an artist', done => {
    request
      .delete(`/api/admin/id/${somePark._id}`)
      .set('authorization', token)
      .then(res => {
        assert.deepEqual(res.body, somePark);
        done();
      })
      .catch(done);
  });

 

});
