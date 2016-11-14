const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poiSchema = new Schema({

  name: { type: String, required: true },
  type: { type: String, required: true },
  location: String,
  hours: String,
  cost: Number,
  childFriendly: Boolean,
  stars: Number,
  reviews: [{
    type: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]

});


module.exports = mongoose.model('Poi', poiSchema);
