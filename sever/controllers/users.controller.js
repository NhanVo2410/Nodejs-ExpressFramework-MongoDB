/* eslint-disable consistent-return */
/* eslint-disable import/order */
const Usermodel = require('../models/user.model');

const bcrypt = require('bcrypt');

exports.GetAll = async (req, res) => {
  try {
    const result = await Usermodel.find().exec();
    return res.status(200).json({
      success: true,
      message: 'A list of all user',
      data: result,

    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
exports.GetSiteByID = async (req, res) => {
  try {
    const result = await Usermodel.findById(req.params.id).exec();
    return res.status(200).json({
      success: true,
      message: 'User has Id that you want',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
exports.Post = async (req, res) => {
  try {
    const user = new Usermodel(req.body);
    user.hash_password = bcrypt.hashSync(req.body.password, 10);
    const result = await user.save();
    return res.status(201).send({
      success: true,
      message: 'Create sucessfully',
      data: result,
      // access_token : token,
      expiresIn: '1h',

    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
exports.Put = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id).exec();
    user.set(req.body);
    const result = await user.save();
    return res.status(200).json({
      success: true,
      message: 'Update successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
exports.Delete = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id).exec();
    const result = await user.deleteOne();
    // var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
    return res.status(200).json({
      success: true,
      message: 'Delete user successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
