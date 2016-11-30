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
      select: 'property type address zip hours subArea amenities childFriendly stars'
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
  
  .put('/stars/:poiId', bodyParser, (req, res, next) => {
    Poi.findById(req.params.poiId)
    .then(poi => { 
      let star = {};
      star.rating = req.body.stars.rating;
      star.author = req.user.id;
      poi.stars.push(star);
      poi.markModified('stars');
      poi.save();
      res.send(poi);
    })
    .catch(next);
  })

  .put('/review/:poiId', bodyParser, (req, res, next) => {
    Poi.findById(req.params.poiId)
      .then(poi => {
        poi.reviews.push(req.body.reviews + ' -' + req.user.name);
        poi.markModified('reviews');
        poi.save();
        res.send(poi);
      })
      .catch(next);
  })
  
  // this should be a DEL to /me
  .delete('/', (req, res, next) => {
    User.findByIdAndRemove(req.user.id)
    .then(user => {
      res.send({deleteMessage: `${user.firstName}'s account has been deleted`});
    })
    .catch(next);
  });

module.exports = router;
