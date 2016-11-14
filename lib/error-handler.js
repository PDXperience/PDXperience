function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars

  let code, error;

  if(err.name === 'ValidationError' || err.name === 'CastError') {
    console.log(err.errors);
    code = 400;
    error = err.errors.name.message;
  } else if (err.code) {
    code = err.code;
    error = err.error;
    console.log(err.code, err.error);
  } else {
    code = 500;
    error = 'Internal Server Error';
    console.log(err);
  }
  res.status(code).send({error});
}

module.exports = errorHandler;