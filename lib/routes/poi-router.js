const express = require('express');
const router = express.Router();
const Poi = require('../models/poi.js');

router  

  .get('/', (req, res, next) => {
    Poi.find({})
    .select('type property address hours -_id')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/type/:type', (req, res, next) => {
    Poi.find(req.params.type)
    .select('property address hours -_id')  // need to run the getStars
    //.lean() // check if we can get stars back
    .then(pois => {
      // pois.forEach  getStars, put that info on the obj this.starAvg = results
      res.send(pois);
    })
    .catch(next);
  })

  .get('/id/:id', (req, res, next) =>{
    Poi.findById(req.params.id)
    .select('-_id')
    // .lean()
      // get average stars
    .then(poi => res.send(poi))
    .catch(next);
  })

  .get('/zip/:zip', (req, res, next) => {
    Poi.find(req.params.zip)
    .select('-_id')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/location/:lat/:long', (req, res, next) => {
    Poi.geoNear({type: 'Point', 
      coordinates: [req.params.long, req.params.lat]}, 
      {maxDistance: 3, spherical: true }, 
      (err, results) => {
        if (err){return next({code: 500, error: err})};
        return results;
    })
    // .lean()
    .then(pois => res.send(pois))
    .catch(next);
  });

module.exports = router;
