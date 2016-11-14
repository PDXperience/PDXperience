const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

router
  .get('/itineraries/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .select('savedPOI')
    .populate({
      path: 'savedPOI',
      select: 'name'
    })
    .lean()
    .then(itinerary => res.send(itinerary))
    .catch(next);
  })
  
  .put('/review/:PoiId', (req, res, next) => {
    User.findByIdAndUpdate(req.params.PoiId, req.body)
    .then()
  })
  ;

module.exports(router);