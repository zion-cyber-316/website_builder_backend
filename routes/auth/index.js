const router = require("express").Router()

const googleauthRoutes = require('./googleAuth');

router.use('/auth',googleauthRoutes)



module.exports = router