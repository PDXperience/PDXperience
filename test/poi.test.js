const Poi = require('../lib/models/poi');
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Poi model', () => {

  it('validates with property and type', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park'
    });

    poi.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('property is required', done => {
    const poi = new Poi({
      type: 'park'
    });

    poi.validate(err => {
      assert.isOk(err, 'property should have been required');
      done();
    });
  });

  it('type is required', done => {
    const poi = new Poi({
      property: 'some place'
    });

    poi.validate(err => {
      assert.isOk(err, 'type should have been required');
      done();
    });  
  });

  it('zip must be a number', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      zip: 'not a number'
    });

    poi.validate(err => {
      assert.isOk(err, 'expected error on zip data type');
      done();
    });
  });

  it('childFriendly must be a boolean', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      childFriendly: true
    });

    poi.validate(err => {
      expect(poi.childFriendly).to.be.a('boolean');
      done();
    });
  });

  it('reviews should be an array', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      reviews: 'blah'
    });
    
    poi.validate(err => {
      expect(poi.reviews).to.be.an('array');
      done();
    });
  });

  it('geo should be an array of numbers', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      geo: 9809
    });

    poi.validate(err => {
      expect(poi.geo).to.be.an('array');
      done();
    });
  });

  it('gets average stars for a poi', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      stars: {rating: 4, author: 12345}
    });
    poi.stars.push({rating: 5, author: 23456});
    poi.stars.push({rating: 2, author: 34567});
    let avg = poi.getStars();
    let expected = 3.7;
    assert.equal(expected, avg);
    done();
  });

});
