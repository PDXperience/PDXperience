const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Poi = require('../models/poi.js');

router

.post('/', bodyParser, (req, res, next) => {
  let poi = new Poi(req.body);
  console.log('poi:', poi);
  return poi.save()
  .then(saved => res.send(saved))
  .catch(next);
})

.delete(':id', (req, res, next) => {
  Poi.findByIdAndRemove(req.params.id)
  .then(deleted => res.send(deleted))
  .catch(next);
});

module.exports = router;
