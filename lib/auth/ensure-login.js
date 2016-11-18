module.exports = function getEnsureLogin() {
  return function ensureLogin(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;

    if(!email || !password || !firstName) {
      return next({
        code: 400,
        error: 'Email, password, and first name are required to sign up.'
      });
    }
    next();
  };
};