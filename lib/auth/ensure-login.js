module.exports = function getEnsureLogin() {
  return function ensureLogin(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) {
      return next({code: 400, error: 'username and password are required'});
    }
    next();
  };
};