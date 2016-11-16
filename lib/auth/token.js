const jwt = require('jsonwebtoken');
const tokenValidator = process.env.APP_SECRET;

module.exports = {

  sign(user) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id,
        name: user.firstName,
        admin: user.admin
      };
      jwt.sign(payload, tokenValidator, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token){ 
    return new Promise((resolve, reject) => {
      jwt.verify(token, tokenValidator, (err, payload) => {
        // default error is jwt internal stack trace: use a custom error instead
        if(err) return reject({'error': 'token malformed'});  
        resolve(payload);
      });
    });
  }
  
};

