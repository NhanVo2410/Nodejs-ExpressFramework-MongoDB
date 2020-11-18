const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  organizationId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  event: Array,
}, { timestamps: true });

module.exports = mongoose.model('Sites', siteSchema);

// import mongoose from 'mongoose';

// //khai báo field có trong object
// const siteSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   title: {
//     type: String,
//     required: true,
//   },

// });
// const Site = mongoose.model('Sites',siteSchema);
// autoIncrement.initialize(mongoose.connection);
// siteSchema.plugin(autoIncrement.plugin, { model: 'Sites', field: '_id' });
// module.exports = {Site};

// organizationId: Number,
// id: Number,
// name: String,
// description: String,
// created: Date.now
// { timestamps: true }
