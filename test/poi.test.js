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
  


});
