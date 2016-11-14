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
  
  .put('/review/id/:PoiId', bodyParser, (req, res, next) => {
    Poi.findById(req.params.PoiId)
    .then(poi => { 
      console.log(poi);
      let star = {};
      console.log(req.user.id);
      star.rating = req.body.stars;
      star.author = req.user.id;
      poi.stars.push(star);
      poi.reviews.push(req.body.reviews + ' -' + req.user.name);
      poi.save();
      res.send(poi);
    })
    .catch(next);
  });

module.exports = router;