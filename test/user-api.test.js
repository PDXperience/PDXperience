const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('User requests:', () => {

  const request = chai.request(app);
  let token = '';

  const somePark = {
    property: 'some park',
    type: 'park',
    address: '123 some st',
    hours: 'dawn to dusk'
  };

  const user = {
    email:'some-body@somebody.com',
    password:'password',
    firstName: 'Nathan',
    admin: true
  };

  before(done => {
    request
      .post('/api/auth/signup')
      .send(user)
      .then(res => {
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
        somePark.__v = 0; 
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
        user._id = res.body._id;
        let expected = {_id: user._id, savedPoi: []};
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
        let itinerary = res.body;
        assert.deepEqual(expected, itinerary);
        done(); 
      })
      .catch(done);
  });

  it('GETs itineraries after adding one', done => {
    request
      .get('/api/me/itineraries')
      .set('authorization', token)
      .then(res => {
        let itinerary = res.body;
        somePark.amenities = res.body.savedPoi[0].amenities;
        somePark.stars = res.body.savedPoi[0].stars;
        let expected = {
          _id: user._id,
          savedPoi: [{
            _id: somePark._id,
            property: somePark.property,
            type: somePark.type,
            address: somePark.address,
            hours: somePark.hours,
            stars: somePark.stars,
            amenities: somePark.amenities
          }]
        };
        assert.deepEqual(expected, itinerary);
        done();
      })
      .catch(done);
  });

  it('PUTs a review and star rating on poi', done => {
    let review = 'This park is really great';
    request
      .put(`/api/me/review/${somePark._id}`)
      .set('authorization', token)
      .send({
        reviews: review,
        stars: {
          rating: 4,
          author: user._id
        }
      })
      .then(res => {
        let poiWithRating = res.body;
        user.author = res.body.stars[0].author;
        let expected = {
          _id: somePark._id,
          property: somePark.property,
          type: somePark.type,
          address: somePark.address,
          hours: somePark.hours,
          __v: somePark.__v,
          reviews: [ `${review} -${user.firstName}` ],
          stars:[{
            rating: 4,
            author: user.author,
            _id: res.body.stars[0]._id
          }],
          amenities: []
        };
        assert.deepEqual(expected, poiWithRating);
        done();
      })
      .catch(done);
  });

  it('DELETEs a poi from itinerary', done => {
    request
      .delete(`/api/me/itineraries/${somePark._id}`)
      .set('authorization', token)
      .then(res => {
        return request
          .get('/api/me/itineraries')
          .set('authorization', token)
          .then(res => {
            let currentItinerary = res.body;
            let expected = {_id: user._id, savedPoi: []};
            assert.deepEqual(expected, currentItinerary);
            done();
          })
          .catch(done);
      });
  });

  it('DELETEs a user', done => {
    request
      .delete('/api/me/deleteuser')
      .set('authorization', token)
      .then(res => {
        let deleteMessage = res.body.deleteMessage;
        let expected = `${user.firstName}'s account has been deleted`;
        assert.equal(expected, deleteMessage);
        done();
      })
      .catch(done);
  });

});
