  

  const router = require("express").Router();
  const paymentController = require('../../controllers/payment');
const isAuthenticated = require("../../middelwere/IsAuthenticated");



router.post("/order",isAuthenticated,paymentController.createOrder)
router.post("/verify",isAuthenticated,paymentController.verifyPayment)



  module.exports = router