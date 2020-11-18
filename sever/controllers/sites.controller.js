// note : var including function != let just including block {} and const is hằng số.
/* eslint-disable consistent-return */
const Sitemodel = require('../models/sites.model');

exports.GetAll = async (req, res) => {
  try {
    const result = await Sitemodel.find().exec();
    return res.status(200).json({
      success: true,
      message: 'A list of all site',
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
    const result = await Sitemodel.findById(req.params.id).exec();
    return res.status(200).json({
      success: true,
      message: 'Site has Id that you want',
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
    const site = new Sitemodel(req.body);
    const result = await site.save();
    return res.status(201).json({
      success: true,
      message: 'Create sucessfully',
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
exports.Put = async (req, res) => {
  try {
    const site = await Sitemodel.findById(req.params.id).exec();
    site.set(req.body);
    const result = await site.save();
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
    const site = await Sitemodel.findById(req.params.id).exec();
    const result = await site.deleteOne();
    // var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
    return res.status(200).json({
      success: true,
      message: 'Delete site successfully',
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
// #region create conllections
// exports.insertBaseData = async (req, res) => {
//   let i = 0;
//   try {
//     const insertBaseData = [
//       {
//         organizationId: 1,
//         id: 2,
//         name: "Base Data 1",
//         description: "Base data 1",
//       },
//       {
//         organizationId: 2,
//         id: 3,
//         name: "Base Data 2",
//         description: "Base data 2",
//       },
//       {
//         organizationId: 3,
//         id: 4,
//         name: "Base Data 3",
//         description: "Base data 3",
//       },
//       {
//         organizationId: 4,
//         id: 5,
//         name: "Base Data 4",
//         description: "Base data 4",
//       },
//     ];

//     while (i < insertBaseData.length) {
//       const baseSite = new sitemodel(insertBaseData[i]);
//       const saveData = await baseSite.save();

//       if (!saveData) {
//         console.log("Error: ", i);
//         continue;
//       }
//       i++;
//     }
//     res.json("Done");
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }
// #endregion

// #region testing with route in server.js
// const sitemodel = require('../models/sites.model');
// module.exports = {
//   create: (req, res) => {
//     let site = new sitemodel({
//     organizationId: req.body.organizationId,
//     id: req.body.id,
//     name: req.body.name,
//     description: req.body.description,
//     created: req.body.created
//     })
//     site.save()
//       .then(result => {
//         res.json({ success: true, result: result })
//       })
//       .catch(err => {
//         res.json({ success: false, result: err })
//       })
//   },

//   update: (req, res) => {
//     sitemodel.update({ _id: req.body._id }, req.body)
//       .then(site => {
//         if (!site) res.json({ success: false, result: "No such site exists" })

//         res.json(site)
//       })
//       .catch(err => {
//         res.json({ success: false, result: err })
//       })
//   },

//   retrieve: (req, res) => {
//     sitemodel.find()
//       .then(site => {
//         if (!site) res.json({ success: false, result: "No site found" })

//         res.json({ sucess: true, result: result })
//       })
//       .catch(err => {
//         res.json({ success: false, result: err })
//       })
//   },

//   delete: (req, res) => {
//     sitemodel.remove({ _id: req.body._id })
//       .then(site => {
//         if (!site) res.json({ success: false, result: "No site with such ID was found" })
//         res.json({ success: true, result: result })
//       })
//       .catch(err => res.json({ success: false, result: err }))
//   }
// }
// #endregion
