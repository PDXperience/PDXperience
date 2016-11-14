const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

router
  .get('/itineraries/:userId', (req, res, next) => {
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
  
  .put('/review/:PoiId', bodyParser, (req, res, next) => {
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
  
  .put('/itineraries/:userId', bodyParser, (req, res, next) => {
    User.findById(req.params.userId)
    .then(account => {
      account.savedPoi.push(req.body.poiId);
      account.save();
      res.send(account);
    })
    .catch(next);
  })
  
  .delete('/itineraries/:userId/:poiId', bodyParser, (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
      let delPoi = req.params.poiId;
      let index = user.savedPoi.indexOf(delPoi);
      if (index > -1) {
        user.savedPoi.splice(index, 1);
      }
      user.save();
      res.send(user);
    })
    .catch(next);
  })

  .delete('/delete/:userId', (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
      res.send(user);
      console.log('user has been deleted');
    })
    .catch(next);
  });

module.exports = router;
