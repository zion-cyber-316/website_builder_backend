const Website = require("../../models/websiteModel")


 const getAllWebsite = async (req, res) => {
    try {
        
        const websites = await Website.find({ user: req.user._id })
    return res.status(200).json(websites)


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = getAllWebsite
