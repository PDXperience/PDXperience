const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

router
  .get('/itineraries/id/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .select('savedPoi.PoiId')
    .populate({
      path: 'savedPoi.PoiId',
      select: 'name'
    })
    .lean()
    .then(itinerary => {
      console.log(itinerary);
      res.send(itinerary);
    })
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
  })
  
  .put('/itineraries/id/:userId', bodyParser, (req, res, next) => {
    User.findById(req.params.userId)
    .then(account => {
      console.log('account', account);
      let newPoi = {};
      newPoi.PoiId = req.body.type;
      console.log('type', req.body.type);
      console.log('newPoi', newPoi);
      account.savedPoi.push(newPoi);
      account.save();
      res.send(account);
    })
    .catch(next);
  });

module.exports = router;