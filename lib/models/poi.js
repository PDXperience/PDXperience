const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poiSchema = new Schema({

  name: { type: String, required: true },
  type: { type: String, required: true },
  location: String,
  hours: String,
  cost: Number,
  childFriendly: Boolean,
  stars: [Number],
  reviews: [{
    type: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]

});

poiSchema.statics.getStars = function() {
  let sum = 0;
  for (let i=0; i < this.stars.length; i++) {
    sum += this.stars.length[0];
  }
  return (sum / this.stars.length);
};

module.exports = mongoose.model('Poi', poiSchema);
