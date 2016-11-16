const express = require('express');
const router = express.Router();
const Poi = require('../models/poi.js');

router  

  .get('/', (req, res, next) => {
    Poi.find({})
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/type/:type', (req, res, next) => {
    Poi.find({type: req.params.type})
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/id/:id', (req, res, next) =>{
    Poi.findById(req.params.id)
    .select('-_id -geo')
    .lean()
    .then(poi => res.send(poi))
    .catch(next);
  })

  .get('/zip/:zip', (req, res, next) => {
    let zip = Number(req.params.zip);
    Poi.find({zip: zip})
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/area/:area', (req, res, next) => {
    Poi.find({subArea:req.params.area})
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  .get('/location/:lat/:long', (req, res, next) => {
    Poi.find({ geo: { '$near': {
      '$geometry': {type: "Point", coordinates: [req.params.long, req.params.lat]},
      '$maxDistance': 800,
      '$spherical': true
    }}}, 
      (err, results) => {
        if (err){return next({code: 500, error: err});}
        return results;
      })
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  });

module.exports = router;
