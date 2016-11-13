const express = require('express');
const app = express();
const morgan = require('morgan');

const poi = require('./routes/poi-router');
// const user = require('./routes/user-router');
const admin = require('./routes/admin-router');
const auth = require('./routes/auth-router');
const ensureAdmin =require('./auth/ensure-admin')();
const ensureAuth = require('./auth/ensure-token')();
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use('/api', poi);
app.use('/api/auth', auth);
// app.use('/api/me', ensureAuth, user);
app.use('/api/admin', ensureAuth, ensureAdmin, admin);
app.use(errorHandler);


module.exports = app;
