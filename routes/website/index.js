const router = require("express").Router()

const websiteRoutes = require('./website');

router.use('/website',websiteRoutes)



module.exports = router