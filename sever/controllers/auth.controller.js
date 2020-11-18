/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usermodel = require('../models/user.model');

exports.register = async (req, res) => {
  const user = new Usermodel(req.body);
  user.hash_password = bcrypt.hashSync(req.body.password, 8);
  // eslint-disable-next-line no-shadow
  Usermodel.findOne({ emailAddress: req.body.emailAddress }, (err, user1) => {
    // const temp = req.body.emailAddress;
    if (err) {
      // eslint-disable-next-line no-param-reassign
      user.hash_password = undefined;
      return res.json({
        message: err,
      });
    } else if (user1) {
      return res.status(403).send({
        message: 'email is exist',
      });
    } else if (!user1) {
      // eslint-disable-next-line no-shadow
      user.save((err, user2) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        }
      });
      return res.json(user);
    }
  });
};
exports.sign_in = async (req, res) => {
  Usermodel.findOne({
    emailAddress: req.body.email,
  // eslint-disable-next-line consistent-return
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({
          sucess: true,
          message: 'Get token sucessfully',
          // eslint-disable-next-line no-underscore-dangle
          token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1h' }),
          expiresIn: '1h',
        });
      }
    }
  });
};
// eslint-disable-next-line consistent-return
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
