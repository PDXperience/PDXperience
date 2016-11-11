function errorHandler(err, req, res, next) {
  const code = err.code || 500;
  const error = (code === 500) ? 'Internal Server Error' : err.error;
  console.error(error || err.message);
  res.status(code);
  res.send({error: error});
}

module.exports = errorHandler;