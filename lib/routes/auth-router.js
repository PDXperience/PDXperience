const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-token')();

router

  .post('/validate', ensureAuth, (req, res, next) => {
    res.send({valid: true});
  })

  .post('/signup', bodyParser, (req, res, next) => {
    const { email, password, firstName } = req.body;
    delete req.body.password;
    if(!email || !password || !firstName) {
      return next({
        code: 400,
        error: 'Username, password, and first name are required to sign-up.'
      });
    }
    User.find({ email })
    .count()
    .then(count => {
      if(count > 0) throw {
        code: 400,
        error: `Username ${email} already taken.`
      };
      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    .then(user => {
      console.log('User: ', user);
      return token.sign(user);
    })
    .then(token => {
      console.log('token: ', token);
      res.send({ token });
    })
    .catch(next);
  })

  .post('/signin', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;
    User.findOne({ username })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw {
            code: 400,
            error: 'Invalid username or password. Please try again.'
          };
        }
        return token.sign(user);
      })
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router; 
