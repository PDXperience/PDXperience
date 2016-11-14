const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

router
  .get('/itineraries', (req, res, next) => {
    User.findById(req.user.id)
    .select('savedPoi')
    .populate({
      path: 'savedPoi',
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
  
  .put('/itineraries', bodyParser, (req, res, next) => {
    User.findById(req.user.id)
    .then(account => {
      account.savedPoi.push(req.body.poiId);
      account.save();
      res.send(account);
    })
    .catch(next);
  })
  
  .delete('/itineraries/:poiId', bodyParser, (req, res, next) => {
    User.findById(req.user.id)
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

  .delete('/delete', (req, res, next) => {
    User.findByIdAndRemove(req.user.id)
    .then(user => {
      res.send(user);
      console.log('user has been deleted');
    })
    .catch(next);
  });

module.exports = router;
