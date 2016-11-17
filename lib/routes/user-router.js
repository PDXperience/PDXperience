const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

router
  .get('/itineraries', (req, res, next) => {
    User.findById(req.user.id)
    .select('savedPoi -_id')
    .populate({
      path: 'savedPoi',
      select: 'property'
    })
    .lean()
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(next);
  })

  .put('/itineraries', bodyParser, (req, res, next) => {
    User.findById(req.user.id)
    .then(account => {
      account.savedPoi.push(req.body.poiId);
      account.save();
      res.send(account.savedPoi);
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

  
  .put('/review/:poiId', bodyParser, (req, res, next) => {
    Poi.findById(req.params.poiId)
    .then(poi => { 
      let star = {};
      star.rating = req.body.stars.rating;
      star.author = req.user.id;
      console.log('star: ', star);
      poi.stars.push(star);
      poi.reviews.push(req.body.reviews + ' -' + req.user.name);
      poi.save();
      res.send(poi);
    })
    .catch(next);
  })
  
  .delete('/deleteuser', (req, res, next) => {
    User.findByIdAndRemove(req.user.id)
    .then(user => {
      res.send(user);
      console.log('Your account has been permanently deleted.');
    })
    .catch(next);
  });

module.exports = router;
