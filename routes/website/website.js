const router = require("express").Router()

const websiteController = require('../../controllers/websiteController');
const isAuthenticated = require("../../middelwere/IsAuthenticated");


router.post('/generate',isAuthenticated,  websiteController.generateWebsite);
router.post('/demo',  websiteController.Demo);
router.post('/update/:id',isAuthenticated,  websiteController.changeWebsite);
router.get('/getbyid/:id',isAuthenticated,  websiteController.getWebsiteById);
router.get('/getall',isAuthenticated,  websiteController.getAllWebsite);
router.get('/deploy/:id',isAuthenticated,  websiteController.deployeWebsite);
router.get('/getbyslug/:slug', websiteController.getBySlug);



module.exports = router