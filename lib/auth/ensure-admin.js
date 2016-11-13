module.exports = function getEnsureAdmin() {
  return function ensureAdmin(req, res, next) {
    if(!req.user.admin) {
      return next({
        code: 401,
        error: 'unauthorized'
      });
    }
    next();
  };
};


