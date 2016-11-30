const express = require('express');
const router = express.Router();
const Poi = require('../models/poi.js');

router

  .get('/', (req, res, next) => {
    Poi.find()
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  })

  // hmm, this is a refinement to above get / via query, 
  // not a sub-resource
  .get('/type/:type', (req, res, next) => {
    Poi.find({type: req.params.type})
    .select('property address zip hours subArea stars avgStars')
    .then(pois => {
      // check out virtual properties in mongoose
      pois.forEach(poi => {
        poi.avgStars= poi.getStars();
      });
      res.send(pois);
    })
    .catch(next);
    
    // Another option would be to use .aggregate to do simple avg:
    const { type } = req.params;
    Poi.aggregate([
      { $match: { type } },
      { $unwind: '$stars' }, 
      { $group: { 
        _id:       '$_id',
        property:  { $first: '$property' },
        address:   { $first: '$address' },
        zip:       { $first: '$zip' },
        hours:     { $first: '$hours' },
        subArea:   { $first: '$subArea' },
        avgStars:  { $avg: '$stars.rating' }
      }},
      { $sort: { avg: -1 }}
    ])
    .then(pois => res.send(pois));

    // Though I think best option would be to update on save...
  })

  .get('/:id', (req, res, next) =>{
    Poi.findById(req.params.id)
    .select('-geo')
    .then(poi => {
      poi.avgStars = poi.getStars();
      res.send(poi);
    })
    .catch(next);
  })

  // these next three should also be query refinements to single get '/'.
  // (Notice other than argument to .find, code is identical!)
  // One good pattern is to use a middleware function that figures out
  // which query (if any exists) and then the primary routing function just
  // calls req.filter

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
    }}} //,
      // Not necessary, will be handled by catch.
      // Don't mix callbacks and promises.    
      // (err, results) => {
      //   if (err){return next({code: 500, error: err});}
      //   return results;
      // }
    )
    .select('property type address zip hours')
    .lean()
    .then(pois => res.send(pois))
    .catch(next);
  });

module.exports = router;