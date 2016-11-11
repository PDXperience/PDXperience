const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'secret';

module.exports = {
  sign(user) {
    return new Promise((res, rej) => {
      const payload = {
        id: user._id,
        admin: user.admin
      };
      jwt.sign(payload, secret, (err, token) => {
        if (err) return rej(err);
        res(token);
      });
    });
  },
  validate(token) {
    return new Promise((res, rej) => {
      jwt.verify(token, secret, (err, decoded) => {
        if(err) return rej({'error': 'token malformed'});
        res(decoded);
      });
    });
  }
};