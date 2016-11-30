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
  avgStars: Number,
  // hmm, I don't think stars/author and review should have been
  // split. Don't you want to correlate the two?
  // Also, I wonder if it should have been moved to a 
  // seperate "ratings" document collection. Might be data concurrency
  // issues if two users review same poi at same time.
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
  const sum = this.stars.reduce((sum, each) => sum + each, 0);
  return (sum / this.stars.length).toFixed(1);
};

module.exports = mongoose.model('Poi', poiSchema);
