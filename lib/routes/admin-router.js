const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi');
const User = require('../models/user');

// Instead of adding seperate resource route for admin actions,
// just secure the routes that need to be secure
router

  // move to user router
  .get('/users', (req,res,next) => {
    User.find({})
    .then(users => res.send(users))
    .catch(next);
  })

  // move to poi router
  .post('/', bodyParser, (req, res, next) => {
    let poi = new Poi(req.body);
    return poi.save()
    .then(saved => res.send(saved))
    .catch(next);
  })

  // move to poi-router
  .delete('/poi/:id', (req, res, next) => {
    Poi.findByIdAndRemove(req.params.id)
    .then(deleted => res.send(deleted))
    .catch(next);
  })

  // move to user router
  .delete('/user/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(deleted => res.send(deleted))
    .catch(next);
  });

module.exports = router;
