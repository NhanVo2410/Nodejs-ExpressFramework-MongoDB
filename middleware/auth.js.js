const jwt = require('jsonwebtoken');

// middleware
// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
    const token = req.headers.authorization.split(' ')[1];
    // eslint-disable-next-line no-unused-vars
    const result = jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).send({
          message: 'Token invalid or expired',
        });
      }
      return next();
    });
  } else {
    return res.status(403).send({
      message: 'Unauthorized',
    });
  }
};

module.exports = auth;
