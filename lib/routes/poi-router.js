const express = require('express');
const router = express.Router();
const Poi = require('../models/poi.js');

router  

  .get('/', (req, res, next) => {
    Poi.find({})
    .select('name type location hours -_id')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/type/:type', (req, res, next) => {
    Poi.find(req.params.type)
    .select('name location hours -_id')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/id/:id', (req, res, next) =>{
    Poi.findById(req.params.id)
    .select('-_id')
    .lean()
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
    Poi.find({ geo: { '$near': {
      '$geometry': {type: "Point", coordinates: [req.params.long, req.params.lat]}
    }}}, 
      (err, results) => {
        if (err){return next({code: 500, error: err});}
        return results;
      })
    // .lean()
    .then(pois => res.send(pois))
    .catch(next);
  });

module.exports = router;
