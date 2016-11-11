const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi.js');

router  

    .get('/', (req, res, next) => {
        if(req.user){ 
            Poi.find({})
                .select(/*display pertinant info*/)
                .lean()
                .then(pois => res.send(pois))
                .catch(next);
        }
        Poi.find({})
                .select(/*display pertinant info minus userinfo*/)
                .lean()
                .then(pois => res.send(pois))
                .catch(next);
    })

    .get('/type/:type', (req, res, next) => {
        const query = {};
        if(req.query.type){
            query.type = req.query.type;
        }
        if(req.user){ 
            Poi.find(query)
                .select(/*display pertinant info*/)
                .lean()
                .then(pois => res.send(pois))
                .catch(next);
        }
        Poi.find(query)
                .select(/*display pertinant info minus userinfo*/)
                .lean()
                .then(pois => res.send(pois))
                .catch(next);
    })

    .get('/id/:id', (req, res, next) =>{
        if(req.user){ 
            Poi.findById(req.params.id)
            .select(/*display pertinant info*/)
            .lean()
            .then(poi => res.send(poi))
            .catch(next);
        }
        Poi.findById(req.params.id)
        .select(/*display pertinant info*/)
        .lean()
        .then(poi => res.send(poi))
        .catch(next);
    })

module.exports = router;