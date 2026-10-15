const Payment = require("../../models/paymentModel");
const User = require("../../models/userModel");
const crypto = require('crypto')


// Verify Payment
 const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // const userId = req.user._id;

    // ✅ Handle successful payment
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
       return res.status(400).json({message:"Invalid Payment Signature"})
    }

    const payment = await Payment.findOne({
        razorpayOrderId:razorpay_order_id
    })

    if(!payment){
        return res.status(400).json({message:"Payment not found"})
    }
    if(payment.status === "paid"){
        return res.json({message:"Already processed"})
    }

    //update payment record
    payment.status = "paid"
    payment.razorpayPaymentId = razorpay_payment_id;
    await payment.save()

    //update user credits
    const updateUser = await User.findByIdAndUpdate(
    payment.userId,
    {
        $inc: { credits: payment.credits },
        plan: payment.planId
    },
    { new: true }
)
    res.json({
        success:true,
        message:"Payment Verified and Credit added",
        user:updateUser
    })
  } catch (error) {
    console.error("❌ Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = verifyPayment