const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  location: String,
  savedPOI: [ { type: Schema.Types.ObjectId, ref: 'POI' } ],
  admin: {type: Boolean, default: false} 
  // myReviews: [ Want an array of references to reviews I wrote ]

});

userSchema.methods.generateHash = function( password ) {
  return this.password = bcrypt.hashSync( password, 10 );
};

userSchema.methods.compareHash = function( password ) {
  return bcrypt.compareSync( password, this.password );
};


module.exports = mongoose.model('User', userSchema);
