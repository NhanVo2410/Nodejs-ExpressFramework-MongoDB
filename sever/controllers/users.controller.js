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
exports.GetUserByTime = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (start === '' || end === '') {
      return res.status(400).json({
        status: false,
        message: 'pls make sure you pick two date',
      });
    }
    console.log({ start, end });
    const user = await Usermodel.find({
      timestamps: {
        $gte: new Date(new Date(start).setHours(0, 0, 0)),
        $lt: new Date(new Date(end).setHours(23, 59, 59)),
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Could not retrieve ticket',
      });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      error: e.message,
    });
  }
};
