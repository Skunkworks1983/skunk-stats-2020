const keys = require('../key');
const customRes = require('../lib/customResponses');
const jwt = require('jsonwebtoken');

module.exports = {
  validateRegister: (req, res, next) => {
    // username min 3 chars
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send('Please enter a username with min. 3 chars');
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send('Please enter a password with min. 6 chars');
    }
    next();
  },
  protectedRoute: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        keys.jwt_secret
      );
      req.userData = decoded;
    } catch {
      customRes.invalidAuth(res);
    }
    next();
  }
}