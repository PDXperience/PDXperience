module.exports = function getEnsureLogin() {
  return function ensureLogin(req, res, next){
    const { email, password, firstName } = req.body;

    if(!email || !password || !firstName) {
      return next({
        code: 400,
        error: 'Email, password, and first name are required to sign up.'
      });
    }
    next();
  };
};