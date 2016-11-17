const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');


describe('Admin:', () => {
	
  // before( done => {
	// 	  const drop = () => connection.db.dropDatabase( done );
	// 	  if( connection.readyState === 1 ) drop();
	// 	  else connection.on( 'open', drop );
	//   });
    
  // after( done => {
  //   const drop = () => connection.db.dropDatabase(done);
  //   if (connection.readyState === 1) drop();
  //   else connection.on( 'open', drop );
  // });

  const request = chai.request(app);
  let adminToken = '';
  let userToken = '';
  const somePark = {
    property: 'some park',
    type: 'park',
    address: '123 some st',
    hours: 'dawn to dusk'
  };

  before(done => {
    request
      .post('/api/auth/signup')
      .send({email:'admin@somebody.com', password:'password', firstName: 'first-name', admin: true})
      .then(res => {
        assert.ok(res.body.token);
        adminToken = res.body.token; 
      })
      .then(done)
      .catch(done);
  });

  before(done => {
    request
      .post('/api/auth/signup')
      .send({email:'user@somebody.com', password:'password', firstName: 'first-name', admin: false})
      .then(res => {
        assert.ok(res.body.token);
        userToken = res.body.token; 
      })
      .then(done)
      .catch(done);
  });

  it('Will not accomplish admin without sign in', done => {
    request
      .post('/api/admin')
      .send(somePark)
      .then(res => done('Error: status should not be 200', res))
      .catch(res => {
        assert.equal(res.status, 403);
        assert.equal(res.response.text, '{"error":"token error--please login again"}')
        done();
      });
  });

  it('Can not accomplish admin roles unless admin', done => {
    request
      .post('/api/admin')
      .set('authorization', userToken)
      .send(somePark)
      .then(res => done('Error: status should not be 200', res))
      .catch(res => {
        assert.equal(res.status, 401);
        assert.equal(res.response.text, '{"error":"unauthorized"}')
        done();
      });
  });

  it('POSTs a new poi', done => {
    request
      .post('/api/admin')
      .set('authorization', adminToken)
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

  it('DELETEs a poi', done => {
    request
      .delete(`/api/admin/poi/${somePark._id}`)
      .set('authorization', adminToken)
      .then(res => {
        assert.deepEqual(res.body, somePark);
        done();
      })
      .catch(done);
  });

});