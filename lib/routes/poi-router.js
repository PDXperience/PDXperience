const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi.js');

router  

    .get('/', (req, res, next) => {
        Poi.find({})
        .select(/*display pertinant info minus userinfo*/)
        .lean()
        .then(pois => res.send(pois))
        .catch(next);
    })

    .get('/type/:type', (req, res, next) => {
        Poi.findById(req.params.type)
        .select(/*display pertinant info*/)
        .lean()
        .then(pois => res.send(pois))
        .catch(next);
    })

    .get('/id/:id', (req, res, next) =>{
        Poi.findById(req.params.id)
        .select(/*display pertinant info*/)
        .lean()
        .then(poi => res.send(poi))
        .catch(next);
    })

module.exports = router;