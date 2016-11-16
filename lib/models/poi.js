const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poiSchema = new Schema({

  property: { type: String, required: true },
  type: { type: String, required: true },
  address: String,
  zip: Number,
  subArea: String,
  hours: String,
  amenities: [ String ],
  geo: {
    type: [Number],
    index: '2dsphere'
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

poiSchema.methods.getStars = function() {
  let sum = 0;
  for (let i=0; i < this.stars.length; i++) {
    sum += this.stars[i].rating;
  }
  return (sum / this.stars.length).toFixed(1);
};

module.exports = mongoose.model('Poi', poiSchema);
