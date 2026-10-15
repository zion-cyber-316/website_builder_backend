const generateResponse = require("../../config/openRouter")
const User = require("../../models/userModel")
const Website = require("../../models/websiteModel")
const extractJson = require("../../utils/extractJson");


 const changeWebsite = async (req, res) => {
    try {

          const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.credits < 5) {
      return res.status(400).json({ message: "You have not enough credits to generate a website" })
    }

    const udpatePrompt = `
    UPDATE THIS HTML WEBSITE.
    
    CURRENT CODE:
    ${website.latestCode}

    USER REQUEST:
    ${prompt}

    RETURN RAW JSON ONLY:
    {
      "message":"Short confirmation",
      "code":"<UPDATE FULL HTML>"
    }
    `

    let raw = ""
    let parsed = null
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(udpatePrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(udpatePrompt + "\n\nRETURN ONLY RAW JSON")
        parsed = await extractJson(raw)
      }
    }
    if (!parsed.code) {
      return res.status(400).json({ message: "AI returned invalid response" })
    }

    website.conversation.push(
      { role: "ai", content: parsed.message },
      { role: "user", content: prompt },
    )

    website.latestCode = parsed.code
    await website.save()
    user.credits = user.credits - 5
    await user.save()
    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits
    })
        
     

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = changeWebsite