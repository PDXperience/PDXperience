const express = require('express');
const app = express();
const morgan = require('morgan');

const poi = require('./routes/poiRouter');
const user = require('./routes/userRouter');
const admin = require('./routes/adminRouter');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use('/api', poi);
app.use('/api/me', user);
app.use('/api/admin', user);
app.use(errorHandler);


module.exports = app;
