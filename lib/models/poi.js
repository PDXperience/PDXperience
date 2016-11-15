const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poiSchema = new Schema({

  Property: { type: String, required: true },
  type: { type: String, required: true },
  Address: String,
  Zip: Number,
  SubArea: String,
  Amenities: [ String ],
  loc: {
    type: 'Point',
    coordinates: [Number]
  },
  childFriendly: Boolean,
  stars: [{
    rating: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  reviews: [String]

});

poiSchema.statics.getStars = function() {
  let sum = 0;
  for (let i=0; i < this.stars.length; i++) {
    sum += this.stars.rating[i];
  }
  return (sum / this.stars.length);
};

module.exports = mongoose.model('Poi', poiSchema);
