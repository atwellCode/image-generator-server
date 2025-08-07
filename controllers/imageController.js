const User = require('../models/userModels');
const axios = require('axios');
const formData = require('form-data');

const generateImage = async (req, res) => {
  try {
    const userId = req.userId; // ✅ get from token
    const { prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ message: "Missing Details" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({ message: "Not enough Credits", creditBalance: user.creditBalance });
    }

    const form = new formData();
    form.append('prompt', prompt);

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
      headers: {
        ...form.getHeaders(),
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, { $inc: { creditBalance: -1 } });

    return res.status(200).json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage
    });
  } catch (error) {
    console.error("Image Generation Error:", error);
    return res.status(500).json({ error: "Error in generating Image", message: error.message });
  }
};

module.exports = { generateImage };
