const express = require('express');
const app = express();
const morgan = require('morgan');

const poi = require('./routes/poi-router');
const admin = require('./routes/admin-router');
const auth = require('./routes/auth-router');
const user = require('./routes/user-router');
const ensureAdmin =require('./auth/ensure-admin')();
const ensureAuth = require('./auth/ensure-token')();
const errorHandler = require('./error-handler');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/../public'));
// give this resource a name. your not getting api's!
app.use('/api', poi);
app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, user);
app.use('/api/admin', ensureAuth, ensureAdmin, admin);

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile(__dirname + '/../public/index.html');
});

app.use(errorHandler);


module.exports = app;
