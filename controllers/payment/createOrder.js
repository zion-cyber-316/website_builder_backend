
const razorpayInstance = require('../../config/razorpay');
const Payment = require('../../models/paymentModel');


 const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;
        if (!amount || !credits) {
            return res.status(400).json({ message: "Invalid plan data" })
        }

        // Step 1: Create Razorpay order
        const options = {
            amount: Math.round(Number(amount) * 100), // convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);
        console.log("✅ Razorpay Order Created:", razorpayOrder);

        await Payment.create({
            userId: req.user._id,
            planId,
            amount,
            credits,
            razorpayOrderId:razorpayOrder.id,
            status:"pending"
        })
        console.log(razorpayOrder)
        return res.json(razorpayOrder)
    } catch (error) {
         return res.status(500).json({message:error.message})
    }
}


module.exports = createOrder