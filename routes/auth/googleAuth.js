const router = require("express").Router()

const googleauthController = require('../../controllers/Auth');


router.post('/google',googleauthController.googleAuth);
router.get('/logout',googleauthController.logOut)




module.exports = router