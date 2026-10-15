const generateResponse = require("../../config/openRouter");
const extractJson = require("../../utils/extractJson");

 const Demo = async (_, res) => {
  try {
    const raw = await generateResponse("Hello");
      const parsed = await extractJson(raw)

    return res.status(201).json(parsed);
  
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = Demo