const generateResponse = require("../../config/openRouter");
const Website = require("../../models/websiteModel");


 const deployeWebsite = async (req, res) => {
  try {
 const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    if (!website.slug) {
      website.slug = website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0, 60) + website._id.toString().slice(-5)
    }

    website.deployed = true
    website.deployedUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`
    await website.save()

    return res.status(200).json({
      url: website.deployedUrl
    })
  
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = deployeWebsite