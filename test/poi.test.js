const Poi = require('../lib/models/poi');
const assert = require('chai').assert;

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



});
