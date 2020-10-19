const Site = require('../models/sites.model');
exports.getAll = async (req, res) => {
  try {
    const site = await Site.find()
    console.log(site)
    res.json(site)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }




  // Site.find()

  // .select('_id organizationId id name description created')
  // .then((allSite) => {
  //   return res.status(200).json({
  //     success: true,
  //     message: 'A list of all site',
  //     Site: allSite,
  //   });
  // })
  // .catch((err) => {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Server error. Please try again.',
  //     error: err.message,
  //   });
  // });
};
